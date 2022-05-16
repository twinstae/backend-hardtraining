import { Module } from '@nestjs/common';
import { SQLiteTodoRepository } from "./todoList/todoList.sqliteTodoRepository";
import { TodoListController } from './todoList/todoList.controller';
import { TodoListService } from './todoList/todoList.service';

@Module({ 
  imports: [],
  controllers: [TodoListController],
  providers: [
    {
      // provider의 이름을 지정해줄 수 있기 때문에
      // 이렇게 쓴다~ By 고양이손 리유님
      // provider가 많아지면 구분하기 쉽게 하기 위해서~ 
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