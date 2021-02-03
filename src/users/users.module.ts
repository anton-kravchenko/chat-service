import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: 'IUserService',
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
