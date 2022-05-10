import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

import { Injectable } from '@nestjs/common';

const FILE_NAME = './database.db';

let dbClient: Database<sqlite3.Database, sqlite3.Statement> | undefined;

const createTodoTableQuery = `CREATE TABLE Todos (
  Content text PRIMARY KEY,
  Completed int,
  CreatedAt int
);`

sqlite3.verbose();

open({
  filename: FILE_NAME,
  driver: sqlite3.Database
}).then(async (newDBClient) => {
  dbClient = newDBClient;
  
  // 1. 테이블을 만든다(db마다 지원하는 타입 확인)
  // await dbClient.exec(createTodoTableQuery);

  // 2. todo 데이터를 추가한다
  // Date.now()
  // 유닉스 시간! 1970년 1월 1일부터 몇 초가 지났는지를 숫자로 나타낸 것
  await dbClient.exec(`INSERT INTO Todos VALUES ("DB만들기2", 1, ${Date.now()})`);
  await dbClient.exec(`INSERT INTO Todos VALUES ("프리스타일 랩하기2", 0, ${Date.now()})`);

  // 3. 모든 todoList row를 들고 와서, 객체 배열로 변환하는 걸 만든다
  const result = await dbClient.all('SELECT Content, Completed, CreatedAt FROM Todos');
  console.log(result.map(row => ({
    content: row.Content,
    completed: Boolean(row.Completed),
    createdAt: row.CreatedAt,
  })));
})

@Injectable()
export class SQLiteTodoRepository implements ITodoRepository {
  constructor(){}
  async saveAll(todoList){
  }

  async getAll(){
    return []
  }
}