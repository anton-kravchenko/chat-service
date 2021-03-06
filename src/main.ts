import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT;

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Chat service')
    .setDescription('CRUD API for user entity')
    .setVersion(process.env.VERSION_TAG)
    .addServer(
      process.env.ENV === 'local'
        ? `http://localhost:${port}`
        : `<I'm running somewhere in the cloud>`,
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(port, () =>
    console.log(`The application is listening at port ${port}`),
  );
}
bootstrap();
