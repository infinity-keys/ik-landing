import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Moralis from 'moralis';

async function bootstrap() {
  if (!Moralis.Core.isStarted) {
    Moralis.start({
      apiKey: process.env.MORALIS_API_KEY,
    });
  }

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
