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
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { IUserService } from './interfaces/IUserService';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    @Inject('IUserService') private readonly usersService: IUserService,
  ) {}

  @Post()
  async create(@Body() CreateUserDTO: CreateUserDTO) {
    this.logger.log(
      `Someone is creating a user: ${JSON.stringify(CreateUserDTO)}`,
    );
    return this.usersService.create(CreateUserDTO);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() UpdateUserDTO: UpdateUserDTO) {
    return this.usersService.update(id, UpdateUserDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
