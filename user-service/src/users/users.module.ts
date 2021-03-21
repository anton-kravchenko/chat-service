import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { RedisService } from 'nestjs-redis';
import * as redis from 'cache-manager-ioredis';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.registerAsync({
      useFactory: (redisService: RedisService) => ({
        store: redis,
        redisInstance: redisService.getClient(),
      }),
      inject: [RedisService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    { provide: 'IUserService', useClass: UsersService },
    // { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
  ],
})
export class UsersModule {}
