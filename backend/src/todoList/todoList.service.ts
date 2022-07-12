import { Injectable, Inject } from '@nestjs/common';
import * as domain from '../todoList';

@Injectable()
export class TodoListService implements ITodoListService {
  constructor(
    @Inject("TODO_REPOSITORY")
    private readonly todoRepository: ITodoRepository
  ){}

  async addTodo(newTodo: Todo){ //1. controller에게 데이터를 받으면
    //2. repository에서 기존 데이터를 들고 와서
    const oldTodoList = await this.todoRepository.getAll();
    //3. domain model에게 처리를 하라고 하고 (todoList, newTodo)를 주고 => 새 투두 리스트
    const newTodoList = domain.addTodo(oldTodoList, newTodo);
    //4. repository에게 다시 새 투두 리스트를 저장하라 하고
    await this.todoRepository.saveAll(newTodoList);
    //5. controller에게 끝났어요
  }

  async deleteTodo(targetContent: string){
    const oldTodoList = await this.todoRepository.getAll();
    const newTodoList = domain.deleteTodo(oldTodoList, targetContent);
    await this.todoRepository.saveAll(newTodoList); 
  }

  async completeTodo (targetContent: string){
    const oldTodoList = await this.todoRepository.getAll();

    const newTodoList = domain.completeTodo(oldTodoList, targetContent);

    await this.todoRepository.saveAll(newTodoList);
  }

  async clearCompleted (){
    const oldTodoList = await this.todoRepository.getAll();

    const newTodoList = domain.clearCompleted(oldTodoList);

    await this.todoRepository.saveAll(newTodoList);
  }
  
  async getTodoList(){
    return this.todoRepository.getAll();
  }
}