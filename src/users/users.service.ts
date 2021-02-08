import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import { IUserService } from './interfaces/IUserService';

@Injectable()
export class UsersService implements IUserService {
  private readonly logger = new Logger(UsersService.name);

  private users: Array<User> = [];

  create(CreateUserDTO: CreateUserDTO) {
    const user = new User(
      uuid(),
      CreateUserDTO.username,
      CreateUserDTO.password,
    );
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      this.logger.error(`Failed to find a customer with the id: "${id}"`);
      throw new NotFoundException(`User with id="${id}" does not exist`);
    }
    return user;
  }

  update(id: string, UpdateUserDTO: UpdateUserDTO) {
    const user = this.findOne(id);
    user.username = UpdateUserDTO.username;
    user.password = UpdateUserDTO.password;
    return user;
  }

  remove(id: string) {
    const user = this.findOne(id);
    this.users = this.users.filter((u) => u !== user);
    return id;
  }
}

// TODO: read about logging
// TODO: integrate winston
// TODO: add more logs
// TODO: add swagger
// TODO: read about: middlewar, guards and interceptors
// TODO: add postman collection
