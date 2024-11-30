import { Injectable } from '@nestjs/common';
import { CreateUserManagementDto } from './dto/create-user-management.dto';
import { UpdateUserManagementDto } from './dto/update-user-management.dto';
import { UserManagementRepository } from './user-management.repository';
import { Types } from 'mongoose';

@Injectable()
export class UserManagementService {
  constructor(
    private readonly userManagementRepository: UserManagementRepository,
  ) {}

  create(createUserManagementDto: CreateUserManagementDto) {
    return this.userManagementRepository.create({
      ...createUserManagementDto,
      userId: new Types.ObjectId().toHexString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  findAll() {
    return this.userManagementRepository.find({});
  }

  findOne(_id: string) {
    return this.userManagementRepository.findOne({ _id });
  }

  update(_id: string, updateUserManagementDto: UpdateUserManagementDto) {
    return this.userManagementRepository.findOneAndUpdate(
      { userId: _id },
      { $set: { ...updateUserManagementDto, updatedAt: new Date() } },
    );
  }

  remove(_id: string) {
    return this.userManagementRepository.findOneAndDelete({ _id });
  }
}
