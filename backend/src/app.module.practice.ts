import { Module } from '@nestjs/common';
//path(길), 상대경로 ./(이 파일이 위치한 현재 위치) ../(파일이 위치한 현재 위치보다 한 단계 더 상위 디렉토리) VS 절대경로 
import { TodoListController } from './todoList/todoList.controller';
import { TodoListService } from './todoList/todoList.service';
import { SQLiteTodoRepository } from './todoList/todoList.sqliteTodoRepository'; 
@Module({
  controllers: [TodoListController],
  providers: [
    { 
        provide: 'TODO_Service',
        useClass: TodoListService
    },    
    { 
        provide: 'TODO_Repository',
        useClass: SQLiteTodoRepository
    }
]
})
export class CatsModule {}