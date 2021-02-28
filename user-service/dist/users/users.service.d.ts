import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { IUsersService } from './interfaces/IUserService';
export declare class UsersService implements IUsersService {
    private userModel;
    private readonly logger;
    private users;
    constructor(userModel: Model<UserDocument>);
    create(createUserDTO: CreateUserDTO): Promise<UserDocument>;
    findAll(): Promise<UserDocument[]>;
    findOne(id: string): Promise<UserDocument>;
    update(id: string, updateUserDTO: UpdateUserDTO): Promise<UserDocument>;
    remove(id: string): Promise<string>;
}
