"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const nestjs_redis_1 = require("nestjs-redis");
const redis = require("cache-manager-ioredis");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            common_1.CacheModule.registerAsync({
                useFactory: (redisService) => ({
                    store: redis,
                    redisInstance: redisService.getClient(),
                }),
                inject: [nestjs_redis_1.RedisService],
            }),
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
        ],
        controllers: [users_controller_1.UsersController],
        providers: [
            { provide: 'IUserService', useClass: users_service_1.UsersService },
            { provide: core_1.APP_INTERCEPTOR, useClass: common_1.CacheInterceptor },
        ],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map