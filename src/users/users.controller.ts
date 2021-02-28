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
  CacheInterceptor,
  CacheTTL,
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
    this.logger.log(
      `Someone is creating a user: ${JSON.stringify(CreateUserDTO)}`,
    );
    return this.usersService.create(CreateUserDTO);
  }

  @Get()
  @CacheTTL(100)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(ClearCacheInterceptor)
  update(@Param('id') id: string, @Body() UpdateUserDTO: UpdateUserDTO) {
    return this.usersService.update(id, UpdateUserDTO);
  }

  @Delete(':id')
  @UseInterceptors(ClearCacheInterceptor)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
