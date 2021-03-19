import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { IUsersService } from './interfaces/IUserService';

@Injectable()
export class UsersService implements IUsersService {
  private readonly logger = new Logger(UsersService.name);

  private users: Array<User> = [];

  public constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDTO: CreateUserDTO) {
    try {
      const user = new this.userModel(createUserDTO);
      return user.save();
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    const user = this.userModel.findById(id);

    if (!user) {
      this.logger.error(`Failed to find a user with the id: "${id}"`);
      throw new NotFoundException(`User with id="${id}" does not exist`);
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
    user.remove();
    return id;
  }
}

// Get IP address of container
// -> docker inspect -f "{{ .NetworkSettings.IPAddress }}" 7266f05cc15c

// Run mongo and bind host and port
// -> docker run -p 127.0.0.1:27017:27017 mongo

// CHAT:
// TODO: add active room
// TODO: store users in redis
// TODO: fix issue with inactive users

// TODO: add docs for docker commands
// TODO: read about logging
// TODO: integrate winston
// TODO: add more logs
// TODO: add swagger
// TODO: read about: middlewar, guards and interceptors
// TODO: add postman collection
// TODO: integrate with Mongo
// TODO: implement CI via GH actions
