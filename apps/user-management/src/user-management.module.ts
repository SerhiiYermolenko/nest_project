import { Module } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { UserManagementController } from './user-management.controller';
import { DatabaseModule } from '@app/common';
import { UserManagementRepository } from './user-management.repository';
import {
  UserManagementDocument,
  UserManagementSchema,
} from './models/user-management.schema';
import { LoggerModule } from '@app/common';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: UserManagementDocument.name, schema: UserManagementSchema },
    ]),
    LoggerModule,
  ],
  controllers: [UserManagementController],
  providers: [UserManagementService, UserManagementRepository],
})
export class UserManagementModule {}
