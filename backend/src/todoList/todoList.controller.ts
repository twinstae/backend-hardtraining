import { Controller, Get, Post, Delete, Patch , Param, Body, Inject } from '@nestjs/common';

@Controller()
export class TodoListController {
    constructor(
        @Inject('TODO_SERVICE')
        private readonly todoListService: ITodoListService
    ){}

    @Get("/todo-list")
    async getTodoList(): Promise<Todo[]>{
        return this.todoListService.getTodoList();
    }

    // 추가
    @Post("/todo-list")
    async addTodo(
        @Body() newTodo: Todo
    ){
        await this.todoListService.addTodo(newTodo);
        { ok: true };
    }

    @Patch("/todo-list/:targetContent")
    async completeTodo(
        @Param('targetContent') targetContent : string
    ){
        await this.todoListService.completeTodo(targetContent);
        return { ok: true }
    }

    //"/todo-list/벚꽃 구경 하기"
    @Delete("/todo-list/:targetContent")
    async deleteTodo(
        @Param('targetContent') targetContent: string
    ){
        await this.todoListService.deleteTodo(targetContent)
    }
}