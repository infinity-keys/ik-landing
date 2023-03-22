import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from 'nest-mongodb';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongoModule.forRoot(process.env.DATABASE_URL, 'nestjs'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
