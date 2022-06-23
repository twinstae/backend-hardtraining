import * as sqlite3 from "sqlite3";
import { Database, open } from "sqlite";
import { Injectable } from '@nestjs/common';

const FILE_NAME = "./database.db";

let dbClient: Database<sqlite3.Database, sqlite3.Statement> | undefined;

open({
  filename: FILE_NAME,
  driver: sqlite3.Database,
}).then((newDBClient) => {
  dbClient = newDBClient;
});

@Injectable()
export class SQLiteTodoRepository implements ITodoRepository {
  //field
  _oldTodoList: Todo[];
  constructor() {}

  async saveAll(todoList: Todo[]) {
    const oldContents = this._oldTodoList.map((todo) => todo.content);
    const newContents = todoList.map((todo) => todo.content);
    const newTodos = todoList.filter(
      (todo) => !oldContents.includes(todo.content)
    );
    const deletedTodos = this._oldTodoList.filter((todo) => {
      return !newContents.includes(todo.content);
    });

    newTodos.forEach((newTodo) =>
      dbClient.exec(
        `INSERT INTO Todos VALUES ("${newTodo.content}",${Number(newTodo.completed)},${newTodo.createdAt})`
      )
    );
    deletedTodos.forEach((todo) =>
      dbClient.exec(`DELETE FROM Todos WHERE Content="${todo.content}"`)
    );
    //아놔이거너무어렵 ㄱ-
    //  updatedTodo는 매개변수로 들어온
    //아니일단 oldTodo부터
    
    // 새 투두 리스트랑 옛날 투두 리스트가 있다
    // 삭제할 거 => 새 투두 리스트에는 없는데, 옛날 투두 리스트에는 있던 거
    // 업데이트 할 거 => 옛날 투두 리스트에도 있긴 했는데, 새 투두 리스트랑 다른 객체인 거
    // 추가할 거 => 옛날 투두 리스트에는 없었는데, 새 투두 리스트에 있는 거
    // (그대로 둘 거) => 옛날에도 있었고 새 투두 에도 있고 그대로인 거

    const updatedTodos = todoList.filter((newTodo) => {
      return this._oldTodoList.some(
        (oldTodo) => oldTodo.content === newTodo.content && oldTodo !== newTodo
      );
    });

    updatedTodos.forEach((updatedTodo) => {
      dbClient.run(
        "UPDATE Todos SET Completed = (:completed) WHERE Content = (:targetContent);",
        {
          ":completed": Number(updatedTodo.completed),
          ":targetContent": updatedTodo.content,
        }
      );
    });
  }

  async getAll() {
    const result = dbClient
      .all(`SELECT Content, Completed, CreatedAt FROM Todos;`)
      .then((result) =>
        result.map((row) => ({
          //validation 깎기
          content: row.Content,
          completed: Boolean(row.Completed),
          createdAt: Number(row.CreatedAt),
        }))
      );
    this._oldTodoList = await result;
    return result; // Promise<Todo[]>
  }
}
