import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { UsersDocument } from '../../../../libs/common/src/models/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository extends AbstractRepository<UsersDocument> {
  protected readonly logger = new Logger(UsersRepository.name);

  constructor(
    @InjectModel(UsersDocument.name)
    userModel: Model<UsersDocument>,
  ) {
    super(userModel);
  }
}
