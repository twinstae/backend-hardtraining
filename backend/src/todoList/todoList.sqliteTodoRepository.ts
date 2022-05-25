import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

import { Injectable } from '@nestjs/common';

const FILE_NAME = './database.db';

let dbClient: Database<sqlite3.Database, sqlite3.Statement> | undefined;

sqlite3.verbose()

open({
  filename: FILE_NAME,
  driver: sqlite3.Database
}).then(async (newDBClient) => {
  dbClient = newDBClient;
})

@Injectable()
export class SQLiteTodoRepository implements ITodoRepository {
  _oldTodoList: Todo[]
  constructor(){}

  // select, update, insert into, delete

  // before after
  // []         [{프리스타일}] => insert into
  // [{프리}]    []          => delete
  // [{프리, 1}] [{프리, 0}]  => update


  async saveAll(todoList: Todo[]){
    // 어려움... 우리가 직접 orm을 만들어야 함!
    //여기서 this = 여기서 쓸게!
    // 바인딩 ? 
    //
    const oldContents = this._oldTodoList.map(todo => todo.content);

    const newTodos = todoList.filter(todo => {
      return !oldContents.includes(todo.content)
    });
    newTodos.forEach(newTodo => {
      dbClient.exec(`INSERT INTO Todos VALUES("${newTodo.content}", ${Number(newTodo.completed)}, ${newTodo.createdAt})`)
    });

    const newContents = todoList.map(todo => todo.content);
    const deletedTodos = this._oldTodoList.filter(todo => {
      return !newContents.includes(todo.content)
    });
    deletedTodos.forEach(deletedTodo => {
      dbClient.exec(`DELETE FROM Todos WHERE Content="${deletedTodo.content}"`);
    });
    
    // old todo content에도 있는데 new todo에도 content 있다 그런데... 두 객체가 다르다면? update 된 거임
    // updated 된 todo만 걸러야 함
    
    const updatedTodos = todoList.filter((newTodo) => {
      // old에도 newTodo와 똑같은 content를 가진 애가 있으면 그걸 찾음
      // 그 이름은 oldTodo
      const oldTodo = this._oldTodoList.find(oldTodo => oldTodo.content === newTodo.content)
      if(oldTodo){
        // oldTodo랑 newTodo가 다르면
        // 이거 업데이트 된 거네!
        if(oldTodo !== newTodo){
          return true
        }
      }
      return false
    })
    updatedTodos.forEach(updatedTodo => {
      console.log(updatedTodo)
      dbClient.run(`UPDATE Todos SET Completed = (:completed) WHERE Content = (:targetContent);`, {
        ':completed': Number(updatedTodo.completed),
        ':targetContent': updatedTodo.content
      })
    })
  }

  async getAll(){
    // getAll을 구현... 쉬움
    // select
    const result = dbClient.all(`SELECT Content, Completed, CreatedAt FROM Todos;`)
      .then(result => result.map((row) => ({
        content: row.Content ,
        completed: Boolean(row.Completed),
        createdAt: row.CreatedAt,
      })))

    this._oldTodoList = await result;

    return result;
  }
}