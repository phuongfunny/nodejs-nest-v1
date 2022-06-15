import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(`http://localhost:${process.env.PORT}`);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
   
  await app.listen(process.env.PORT);
}
bootstrap();
