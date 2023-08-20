import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST, DELETE',
  });
  console.log(`listen port ${process.env.PORT}`);
  await app.listen(process.env.PORT);
}
bootstrap();
