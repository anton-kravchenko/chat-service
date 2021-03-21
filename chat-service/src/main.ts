import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(process.env.PORT);
}
bootstrap();

/**
 * TODO:// Get IP address of container
// -> docker inspect -f "{{ .NetworkSettings.IPAddress }}" 7266f05cc15c

// Run mongo and bind host and port
// -> docker run -p 127.0.0.1:27017:27017 mongo

// CHAT:
  - add active room
  - store users in redis
  - fix issue with inactive users

  - add docs for docker commands
  - read about logging
  - integrate winston
  - add more logs
  - add swagger
  - read about: middlewar, guards and interceptors
  - add postman collection
  - integrate with Mongo
  - implement CI via GH actions
 */
