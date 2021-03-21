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
  CacheTTL,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { ClearCacheInterceptor } from 'src/cache/ClearCacheInterceptor';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { IUsersService } from './interfaces/IUserService';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    @Inject('IUserService') private readonly usersService: IUsersService,
  ) {}

  @Post()
  @UseInterceptors(ClearCacheInterceptor)
  async create(@Body() CreateUserDTO: CreateUserDTO) {
    this.logger.log(`Creating a user: ${JSON.stringify(CreateUserDTO)}`);
    return this.usersService.create(CreateUserDTO);
  }

  @Get()
  @CacheTTL(100)
  @UseInterceptors(CacheInterceptor)
  findAll() {
    this.logger.log(`Fetching all users`);
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  findOne(@Param('id') id: string) {
    this.logger.log(`Searching for a user with "${id}" id`);
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(ClearCacheInterceptor)
  update(@Param('id') id: string, @Body() UpdateUserDTO: UpdateUserDTO) {
    this.logger.log(`Updating user with "${id}" id`);
    return this.usersService.update(id, UpdateUserDTO);
  }

  @Delete(':id')
  @UseInterceptors(ClearCacheInterceptor)
  remove(@Param('id') id: string) {
    this.logger.log(`Deleting user with "${id}" id`);
    return this.usersService.remove(id);
  }
}
