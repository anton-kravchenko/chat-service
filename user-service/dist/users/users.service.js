"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const mongoose_2 = require("mongoose");
let UsersService = UsersService_1 = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
        this.logger = new common_1.Logger(UsersService_1.name);
        this.users = [];
    }
    async create(createUserDTO) {
        try {
            const user = new this.userModel(createUserDTO);
            return user.save();
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    async findAll() {
        return this.userModel.find();
    }
    async findOne(id) {
        const user = this.userModel.findById(id);
        if (!user) {
            this.logger.error(`Failed to find a user with the id: "${id}"`);
            throw new common_1.NotFoundException(`User with id="${id}" does not exist`);
        }
        return user;
    }
    async update(id, updateUserDTO) {
        var _a, _b;
        const user = await this.findOne(id);
        user.username = (_a = updateUserDTO.username) !== null && _a !== void 0 ? _a : user.username;
        user.email = (_b = updateUserDTO.email) !== null && _b !== void 0 ? _b : user.email;
        return await user.save();
    }
    async remove(id) {
        const user = await this.findOne(id);
        user.remove();
        return id;
    }
};
UsersService = UsersService_1 = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map