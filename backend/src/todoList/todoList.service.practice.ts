import { Injectable, Inject } from "@nestjs/common";
import domain from "src/todoList";
@Injectable()
export class TodoListService implements ITodoListService {
  constructor(
    @Inject("TODO_REPOSITORY")
    private readonly todoRepository: ITodoRepository
  ) {}

  //domain.deleteTodo(todoList, targetContent)

  async addTodo(newTodo: Todo) {
    const oldTodoList = await this.todoRepository.getAll();
    const newTodoList = domain.addTodo(oldTodoList, newTodo);
    await this.todoRepository.saveAll(newTodoList);
  }

  async deleteTodo(
    targetContent: string //1. controller에게 데이터를 받으면
  ) {
    //2. repository에서 기존 데이터를 들고 와서
    const oldTodoList = await this.todoRepository.getAll();
    //3. domain model에게 처리를 하라고 하고 주고 => 새 투두 리스트
    const newTodoList = domain.deleteTodo(oldTodoList, targetContent);
    //4. repository에게 다시 새 투두 리스트를 저장하라 하고
    await this.todoRepository.saveAll(newTodoList);
  }

  async completeTodo(targetContent: string) {
    //controller한테 targetContent를 받으면
    //repository에게서 기존 데이터를 들고 와서
    const oldTodoList = await this.todoRepository.getAll();
    //domain한테 컴플리트하라고 하고 => 수정된투두리스트(completedTodo
    const completedTodo = domain.completeTodo(oldTodoList, targetContent)
    await this.todoRepository.saveAll(completedTodo)
    // repository에 저장하고
    //리턴은하지않음

  }

  //여기서 async가 붙는이유를생각해보자!
  async getTodoList() {
      return this.todoRepository.getAll();
  }
  //생성자를 통해서 todoListService?를 만듦.
  // 클래스안에서는 메서드를 정의함.

  // ??? domain의타입이 ITodoListService가 맞나?
  //그런데 그 메서드는 domain의 함수들을 불러온 친구들
  //도메인들은 인스턴스화된 도메인


}
