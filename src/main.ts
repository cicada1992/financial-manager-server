import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://financial-ledger.com', 'http://localhost:3000'],
    methods: 'GET, PUT, POST, DELETE',
  });
  console.log(`listen port ${process.env.PORT}`);
  await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();
