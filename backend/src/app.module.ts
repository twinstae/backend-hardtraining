import { Module } from '@nestjs/common';

import { FsTodoRepository } from "./todoList/todoList.fsRepository";
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
      useClass: FsTodoRepository,
    }
  ]
})
export class AppModule {}