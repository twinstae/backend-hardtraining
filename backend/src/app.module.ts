import { Module } from '@nestjs/common';

import { TypeOrmTodoRepository } from "./todoList/todoList.typeOrmRepository";
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
      useClass: TypeOrmTodoRepository,
    }
  ]
})
export class AppModule {}