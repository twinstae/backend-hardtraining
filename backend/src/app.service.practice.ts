import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    static getHello(){
        throw new Error('method not implemented')
    }

    getHello() : string {
    return 'hello world'
    }


}
