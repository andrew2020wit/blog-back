import { NestFactory } from '@nestjs/core';
// import * as dotenv from 'dotenv';
import 'dotenv/config';
import { AppModule } from './app.module';

// dotenv.config();

require('dotenv').config();

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // app.setGlobalPrefix('api');
  await app.listen(PORT);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
