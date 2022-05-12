import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class DefaultController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}

@Controller('/todo-list')
export class TodoListController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';





  }
}