import { Module } from '@nestjs/common';
import { SQLiteTodoRepository } from "./todoList/todoList.sqliteTodoRepository.practice";
import { TodoListController } from './todoList/todoList.controller';
import { TodoListService } from './todoList/todoList.service';

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
      useClass: SQLiteTodoRepository,
    }
  ]
})
export class AppModule {}