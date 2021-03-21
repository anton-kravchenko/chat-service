import { User, UserDocument } from './schemas/user.schema';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { IUsersService } from './interfaces/IUserService';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService implements IUsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDTO: CreateUserDTO) {
    try {
      const user = new this.userModel(createUserDTO);
      return await user.save();
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e);
    }
  }

  async findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    const user = this.userModel.findById(id);

    if (!user) {
      this.logger.warn(`User with id ${id} doen't exist`);
      throw new NotFoundException(`User with id ${id} doesn't exist`);
    }

    return user;
  }

  async update(id: string, updateUserDTO: UpdateUserDTO) {
    const user = await this.findOne(id);

    user.username = updateUserDTO.username ?? user.username;
    user.email = updateUserDTO.email ?? user.email;

    return await user.save();
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await user.remove();

    return id;
  }
}
