import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TodoTable } from './todoList.todoTable';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './database.db',
  logging: true,
  synchronize: true,
  entities: [TodoTable],
});

AppDataSource.initialize()
  .then(() => {
    console.log('typeorm data source is initialized');
  })
  .catch(console.error);

@Injectable()
export class TypeOrmTodoRepository implements ITodoRepository {
  private _todoRepository: Repository<TodoTable>;

  constructor() {
    this._todoRepository = AppDataSource.getRepository(TodoTable);
  }

  async saveAll(todoList: Todo[]) {
    const oldTodoList = await this._todoRepository.find();

    const newContents = todoList.map(todo => todo.content);
    const deletedTodos = oldTodoList.filter(
      todo => !newContents.includes(todo.content)
    );

    await Promise.all([
      this._todoRepository.remove(deletedTodos),
      this._todoRepository.save(todoList),
    ]);
  }

  async getAll() {
    return this._todoRepository.find();
  }
}
