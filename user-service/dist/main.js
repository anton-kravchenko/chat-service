"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT;
    const swaggerOptions = new swagger_1.DocumentBuilder()
        .setTitle('Chat service')
        .setDescription('CRUD API for user entity')
        .setVersion(process.env.VERSION_TAG)
        .addServer(process.env.ENV === 'local'
        ? `http://localhost:${port}`
        : `<I'm running somewhere in the cloud>`)
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerOptions);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    await app.listen(port, () => console.log(`The application is listening at port ${port}`));
}
bootstrap();
//# sourceMappingURL=main.js.map