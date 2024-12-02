import { Injectable, Inject } from '@nestjs/common';
import { CreateUserManagementDto } from './dto/create-user-management.dto';
import { UpdateUserManagementDto } from './dto/update-user-management.dto';
import { UserManagementRepository } from './user-management.repository';
import { Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import {
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserDTO } from '@app/common';
import { DelayedNotificationService } from '../../notifications/src/delayed-notifications.service';

@Injectable()
export class UserManagementService {
  constructor(
    private readonly userManagementRepository: UserManagementRepository,
    private readonly delayedNotificationService: DelayedNotificationService,
  ) {}

  private async validateCreateUserManagementDto(
    createUserManagementDto: CreateUserManagementDto,
  ) {
    try {
      await this.userManagementRepository.findOne({
        email: createUserManagementDto.email,
      });
    } catch (error) {
      return;
    }
    throw new UnprocessableEntityException('User already exists');
  }

  async create(
    createUserManagementDto: CreateUserManagementDto,
    user: UserDTO,
  ) {
    await this.validateCreateUserManagementDto(createUserManagementDto);

    const userFromDB = await this.userManagementRepository.create({
      ...createUserManagementDto,
      password: await bcrypt.hash(createUserManagementDto.password, 10),
      userId: new Types.ObjectId().toHexString(),
      createdBy: user._id,
      updatedBy: user._id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (userFromDB.email && userFromDB._id) {
      await this.delayedNotificationService.scheduleWelcomeEmail({
        _id: userFromDB._id.toHexString(),
        email: userFromDB.email,
      });
    }

    return userFromDB;
  }

  async findAll() {
    return this.userManagementRepository.find({});
  }

  async findOne(_id: string) {
    return this.userManagementRepository.findOne({ _id });
  }

  async update(
    _id: string,
    updateUserManagementDto: UpdateUserManagementDto,
    user: UserDTO,
  ) {
    return this.userManagementRepository.findOneAndUpdate(
      { userId: _id },
      {
        $set: {
          ...updateUserManagementDto,
          updatedAt: new Date(),
          updatedBy: user._id,
        },
      },
    );
  }

  async remove(_id: string) {
    return this.userManagementRepository.findOneAndDelete({ _id });
  }

  async verifyUser(email: string, password: string) {
    const user = await this.userManagementRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid)
      throw new UnauthorizedException('Credentials are not valid');
    return user;
  }
}
