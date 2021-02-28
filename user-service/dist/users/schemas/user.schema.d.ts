import { Document } from 'mongoose';
export declare class User {
    username: string;
    email: string;
    active: boolean;
    claims: string[];
}
export declare type UserDocument = User & Document;
export declare const UserSchema: import("mongoose").Schema<Document<User>, import("mongoose").Model<Document<User>>, undefined>;
