import { Module } from '@nestjs/common';
import { SQLiteTodoRepository } from "./todoList/todoList.sqliteTodoRepository.practice";
import { TodoListController } from './todoList/todoList.controller';
import { TodoListService } from './todoList/todoList.service';
import { TypeOrmTodoRepository } from './todoList/todoList.typeOrmRepository';

@Module({ 
  imports: [],
  controllers: [TodoListController],
  providers: [
    {
      provide: 'TODO_SERVICE',
      useClass: TodoListService
    },
    {
      provide: 'TODO_REPOSITORY',
      useClass: TypeOrmTodoRepository,
    }
  ]
})
export class AppModule {}