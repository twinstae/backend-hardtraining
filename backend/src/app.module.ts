import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [], // 빵, 왜갑자기 된장찌개 ㅠㅠㅠ 
  controllers: [AppController], // fetch 해석받는 창구(info center)
  providers: [AppService], // 된찌 설명서 (주방)
})
export class AppModule {}