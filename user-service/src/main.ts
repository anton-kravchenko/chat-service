import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Chat service')
    .setDescription('CRUD API for user entity')
    .setVersion(process.env.VERSION_TAG)
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT;
  await app.listen(port, () =>
    console.log(`The application is listening at port ${port}`),
  );
}

bootstrap();
