import { Entity , Column, PrimaryColumn, DataSource, Repository } from "typeorm"
import { Injectable } from "@nestjs/common";


@Entity("Todos")
export class TodoTable {
    @PrimaryColumn('text', { nullable: false, length: 140, name: "Content" })
    content: string
    
    @Column('boolean',{ nullable: false, name: "Completed" })
    completed: boolean

    @Column('integer', { nullable: false, name: "CreatedAt"})
    createdAt: number
}

const AppDataSource = new DataSource({
     type : "sqlite",
    database: "database.db",
    synchronize: true,
    logging: true,
    entities: [TodoTable],
    subscribers: [],
    migrations: [],
})

@Injectable()
export class TypeOrmRepository implements ITodoRepository {
  _repository: Promise<Repository<TodoTable>>
  constructor() {
    this._repository = AppDataSource.initialize().then(dataSource => dataSource.getRepository(TodoTable))
  }

  async saveAll(newTodoList: Todo[]) {
      const repository = await this._repository;
      const oldTodoList = await this.getAll();
      // delete 구현해야 
      // newTodoList에서 oldTodo의 content와 같은 게 한개도 없다면~ 
      const deletedTodos = oldTodoList.filter((oldTodo)=> newTodoList.every((newTodo)=> newTodo.content !== oldTodo.content))
      await repository.remove(deletedTodos)

      await repository.save(newTodoList) // insert, update
  }

  async getAll() {
    const repository = await this._repository;
    return repository.find()
  }
}