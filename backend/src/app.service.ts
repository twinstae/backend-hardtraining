import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  static getHello() {
    throw new Error("Method not implemented.");
  }
  getHello(): string {
    return 'Hello World!';
  }
}