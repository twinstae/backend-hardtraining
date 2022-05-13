import * as fs from 'fs/promises';
import { Injectable } from '@nestjs/common';

const FILE_NAME = "todoList.json";

@Injectable()
export class FsTodoRepository implements ITodoRepository {
  constructor(){}
  async saveAll(todoList){
    const data = JSON.stringify(todoList);
    await fs.writeFile('./' + FILE_NAME, data, { encoding: 'utf-8' });  
  }

  async getAll(){
    const json = await fs.readFile('./' + FILE_NAME, { encoding: 'utf-8' });
    return JSON.parse(json) as Todo[];
  }
}