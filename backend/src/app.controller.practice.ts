import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import fsRepository from "./fsRepository";
//todoListController
//@Controller('App') ??

@Controller()
export class AppController {
  constructor(private readonly AppService: AppService) {}

  @Get("/")
  getHello() :string {
    return this.AppService.getHello();
  }

  @Get("/todo-list")
  getTodoList() : Promise<Todo[]> {
    return fsRepository.getAll();

   
  }
}
