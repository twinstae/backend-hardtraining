import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";
const FILE_NAME = "./database.db";

let dbClient: Database<sqlite3.Database, sqlite3.Statement> | undefined;
sqlite3.verbose();

open({
  filename: FILE_NAME,
  driver: sqlite3.Database,
}).then((newDBClient) => {
  dbClient = newDBClient;
});

export class SQLiteTodoRepository implements ITodoRepository {
  //field
  _oldTodoList: Todo[];
  constructor() {}

  async saveAll(todoList: Todo[]) {
    const oldContents = this._oldTodoList.map((todo) => todo.content);
    const newContents = todoList.map((todo)=> todo.content)
    const newTodos = todoList.filter(
      (todo) => !oldContents.includes(todo.content)
    );
    const deletedTodos = todoList.filter((todo) => {
      return !newContents.includes(todo.content);
    });
    const updatedTodos = todoList.filter((todo)=> 
    !oldContents.includes(todo.content))

    newTodos.forEach((newTodo) =>
      dbClient.exec(
        `INSERT INTO Todos (Content, Completed, CreatedAt) VALUES (${newTodo.content},${newTodo.completed},${newTodo.createdAt})`
      )
    );
    deletedTodos.forEach((todo) =>
      dbClient.exec(`DELETE FROM Todos WHERE Content = ${todo.content}`)
    );

    updatedTodos.forEach((todo)=> {
      // UPDATE table_name
      // SET column1 = value1, column2 = value2, ...
      // WHERE condition;
      dbClient.exec(`UPDATE Todos SET Content = ${todo.content}, Completed = ${todo.completed}, CreatedAt = ${todo.createdAt}`)
    
    
    })

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
