import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export interface IUserService {
  create(CreateUserDTO: CreateUserDTO): User;
  findAll(): Array<User>;
  findOne(id: string): User;
  update(id: string, UpdateUserDTO: UpdateUserDTO): User;
  remove(id: string): string;
}
