import { Entity , Column, PrimaryColumn, DataSource, Repository } from "typeorm"
import { Injectable } from "@nestjs/common";


@Entity("Todos")
export class TodoTable {
    @PrimaryColumn({ length: 140, name: "Content" })
    content: string

    @Column({ name: "Completed" })
    completed: boolean

    @Column({ name: "CreatedAt"})
    createdAt: number
}

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.db",
    synchronize: true,
    logging: true,
    entities: [TodoTable],
    subscribers: [],
    migrations: [],
})


AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))


@Injectable()
export class TypeOrmTodoRepository implements ITodoRepository {
  _repository: Repository<TodoTable>
  constructor() {
    this._repository = AppDataSource.getRepository(TodoTable)
  }

  async saveAll(newTodoList: Todo[]) {
      const oldTodoList = await this.getAll();
      // delete 구현해야 
      // newTodoList에서 oldTodo의 content와 같은 게 한개도 없다면~ 
      const deletedTodos = oldTodoList.filter((oldTodo)=> newTodoList.every((newTodo)=> newTodo.content !== oldTodo.content))
      await this._repository.remove(deletedTodos)

      await this._repository.save(newTodoList) // insert, update
  }

  async getAll() {
    return this._repository.find()
  }
}

