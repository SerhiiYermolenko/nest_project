import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { UserManagementDocument } from './models/user-management.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserManagementRepository extends AbstractRepository<UserManagementDocument> {
  protected readonly logger = new Logger(UserManagementRepository.name);

  constructor(
    @InjectModel(UserManagementDocument.name)
    userModel: Model<UserManagementDocument>,
  ) {
    super(userModel);
  }
}
