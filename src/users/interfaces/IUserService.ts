import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { UserDocument, User } from '../schemas/user.schema';

export interface IUsersService {
  create(createUserDto: CreateUserDTO): Promise<User>;
  findAll(): Promise<UserDocument[]>;
  findOne(id: string): Promise<User>;
  update(id: string, updateUserDto: UpdateUserDTO): Promise<User>;
  remove(id: string): Promise<string>;
}
