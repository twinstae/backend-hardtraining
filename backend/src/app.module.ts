import "reflect-metadata"
import { Module } from '@nestjs/common';
import { TodoListController } from './todoList/todoList.controller';
import { TodoListService } from './todoList/todoList.service';
import { TypeOrmRepository } from './todoList/todoList.typeOrmRepository';

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
      useClass: TypeOrmRepository,
    }
  ]
})
export class AppModule {}