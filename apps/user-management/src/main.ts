import { NestFactory } from '@nestjs/core';
import { UserManagementModule } from './user-management.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(UserManagementModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(app.get(Logger));
  const configService = app.get(ConfigService);
  await app.startAllMicroservices();
  await app.listen(configService.get('HTTP_PORT') ?? 3000);
}
bootstrap();
