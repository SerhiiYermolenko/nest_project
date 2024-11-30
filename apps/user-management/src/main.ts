import { NestFactory } from '@nestjs/core';
import { UserManagementModule } from './user-management.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(UserManagementModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(app.get(Logger));
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
