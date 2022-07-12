import { Controller, Get, Post, Delete, Patch , Param, Body, Inject } from '@nestjs/common';

@Controller("/todo-list")
export class TodoListController {
    constructor(
        @Inject('TODO_SERVICE')
        private readonly todoListService: ITodoListService
    ){}

    @Get("/")
    async getTodoList(): Promise<Todo[]>{
        return this.todoListService.getTodoList();
    }

    // 추가
    @Post("/")
    async addTodo(
        @Body() newTodo: Todo
    ){
        await this.todoListService.addTodo(newTodo);
    }

    @Patch("/:targetContent")
    async completeTodo(
        @Param('targetContent') targetContent : string
    ){
        await this.todoListService.completeTodo(targetContent);
    }

    //"/todo-list/벚꽃 구경 하기"
    @Delete("/:targetContent")
    async deleteTodo(
        @Param('targetContent') targetContent: string
    ){
        await this.todoListService.deleteTodo(targetContent)
    }
}