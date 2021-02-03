import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import { IUserService } from './interfaces/IUserService';

@Injectable()
export class UsersService implements IUserService {
  private users: Array<User> = [];

  create(createUserDto: CreateUserDto) {
    const user = new User(
      uuid(),
      createUserDto.username,
      createUserDto.password,
    );
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user)
      throw new NotFoundException(`User with id="${id}" does not exist`);
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    user.username = updateUserDto.username;
    user.password = updateUserDto.password;
    return user;
  }

  remove(id: string) {
    const user = this.findOne(id);
    this.users = this.users.filter((u) => u !== user);
    return id;
  }
}
