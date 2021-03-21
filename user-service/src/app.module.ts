import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from 'nestjs-redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

const CONNECTION_TIMEOUT_MS = 60 * 1000;
@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.DATABASE_URL,
      process.env.MONGO_PASSWORD
        ? {
            authSource: 'admin',
            user: process.env.MONGO_USER,
            pass: process.env.MONGO_PASSWORD,
            connectTimeoutMS: CONNECTION_TIMEOUT_MS,
          }
        : undefined,
    ),
    RedisModule.register({
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
      connectTimeout: CONNECTION_TIMEOUT_MS,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
