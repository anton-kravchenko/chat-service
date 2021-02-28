import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { IUsersService } from './interfaces/IUserService';
export declare class UsersController {
    private readonly usersService;
    private readonly logger;
    constructor(usersService: IUsersService);
    create(CreateUserDTO: CreateUserDTO): Promise<import("./schemas/user.schema").User>;
    findAll(): Promise<import("./schemas/user.schema").UserDocument[]>;
    findOne(id: string): Promise<import("./schemas/user.schema").User>;
    update(id: string, UpdateUserDTO: UpdateUserDTO): Promise<import("./schemas/user.schema").User>;
    remove(id: string): Promise<string>;
}
