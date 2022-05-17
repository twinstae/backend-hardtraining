//import { TodoListService } from "./todoList.service";
import { Controller, Get, Post, Patch, Delete, Body, Param } from "@nestjs/common";

@Controller()
export class TodoListController {
  constructor(private readonly todoListService: ITodoListService) {}
  // get은 await가 없어요~왜요?
  @Get("/todo-list")
  async getTodoList(): Promise<Todo[]> {
    return this.todoListService.getTodoList();
  }
  // [핑의 오개념~]url에 path-variable안달아줘도됨~!
  @Post("/todo-list")
  async addTodo(@Body() newTodo: Todo) {
    await this.todoListService.addTodo(newTodo);
  }

  @Patch("/todo-list:targetContent")
  async completeTodo(@Param('targetContent') targetContent : string) {
    await this.todoListService.completeTodo(targetContent);
  }

  @Delete("/todo-list:targetContent")
  async deleteTodo(
      @Param('targetContent') targetContent : string
  ){
    await this.todoListService.deleteTodo(targetContent);
  }
}
