import { ClearCacheInterceptor } from './../cache/ClearCacheInterceptor';
import { IUsersService } from './interfaces/IUserService';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Inject,
  Logger,
  UseInterceptors,
  CacheTTL,
} from '@nestjs/common';

import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { RedisService } from 'nestjs-redis';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    @Inject('IUsersService') private readonly usersService: IUsersService,
    redisService: RedisService,
  ) {
    redisService.getClient().set('hello', 'world');
  }

  @Post()
  @UseInterceptors(ClearCacheInterceptor)
  create(@Body() createUserDto: CreateUserDTO) {
    this.logger.log(`Creating a user ${JSON.stringify(createUserDto)}`);
    return this.usersService.create(createUserDto);
  }

  @Get()
  @CacheTTL(10)
  async findAll() {
    this.logger.log(`Loading all users`);
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log(`Searching user by id "${id}"`);
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
    this.logger.log(
      `Updating user by id "${id}": ${JSON.stringify(updateUserDto)}`,
    );
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log(`Deleting user by id "${id}"`);
    return this.usersService.remove(id);
  }
}
