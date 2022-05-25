import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'


const dbClient : new sqlite3.Database();

const FILE_NAME = './database.db'

open({
  filename: FILE_NAME,
  driver: sqlite3.Database
}).then((db) => {
  // do your thing
})


class SQLiteTodoRepository implements ITodoRepository{
_oldTodoList : Todo[]
constructor(){}


    async saveAll(){

    }



    async getAll(){
    return void //아무거나 넣어둔거
    };


}


