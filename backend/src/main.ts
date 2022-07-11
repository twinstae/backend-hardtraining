
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

// TypeORMError: Column type for TodoTable#content is not defined and cannot be guessed.
//  Make sure you have turned on an "emitDecoratorMetadata": true option in tsconfig.json. 
// Also make sure you have imported "reflect-metadata" on top of the main entry file in your application (before any entity imported).
// If you are using JavaScript instead of TypeScript you must explicitly provide a column type.