//import { TodoListService } from "./todoList.service";
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Inject
} from "@nestjs/common";

@Controller()
export class TodoListController {
  constructor(
    @Inject("TODO_SERVICE") //@injectable과의 차이?
    private readonly todoListService: ITodoListService
  ) {}

  @Get("/todo-list")
  async getTodoList(): Promise<Todo[]> {
    return this.todoListService.getTodoList();
  }

  @Post("/todo-list")
  async addTodo(@Body() newTodo: Todo) {
    await this.todoListService.addTodo(newTodo);
  }

  @Patch("/todo-list/:targetContent")
  async completeTodo(@Param("targetContent") targetContent: string) {
    await this.todoListService.completeTodo(targetContent);
  }

  @Delete("/todo-list/:targetContent")
  async deleteTodo(@Param("targetContent") targetContent: string) {
    await this.todoListService.deleteTodo(targetContent);
  }
}
