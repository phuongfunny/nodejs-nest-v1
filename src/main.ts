import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationErrorFilter } from './validation-error.filter';

async function bootstrap() {
  console.log(`http://localhost:${process.env.PORT}`);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new ValidationErrorFilter());

  await app.listen(process.env.PORT);
}
bootstrap();
