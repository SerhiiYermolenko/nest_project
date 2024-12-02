import {
  Injectable,
  Inject,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UsersRepository } from './users.repository';
import { Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { UserDTO, NOTIFICATIONS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsClient: ClientProxy,
    private readonly UsersRepository: UsersRepository,
  ) {}

  private async validateCreateUsersDto(createUsersDto: CreateUsersDto) {
    try {
      await this.UsersRepository.findOne({
        email: createUsersDto.email,
      });
    } catch {
      return;
    }
    throw new UnprocessableEntityException('User already exists');
  }

  async create(createUsersDto: CreateUsersDto, user: UserDTO) {
    await this.validateCreateUsersDto(createUsersDto);

    const userFromDB = await this.UsersRepository.create({
      ...createUsersDto,
      password: await bcrypt.hash(createUsersDto.password, 10),
      userId: new Types.ObjectId().toHexString(),
      createdBy: user?._id ?? createUsersDto?.email,
      updatedBy: user?._id ?? createUsersDto?.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (userFromDB?.email && userFromDB?._id) {
      const userDTO: Omit<UserDTO, 'password'> = {
        email: userFromDB.email,
        _id: userFromDB._id.toHexString(),
      };
      this.notificationsClient.emit('schedule-welcome-email', userDTO);
    }

    return userFromDB;
  }

  async findAll() {
    return this.UsersRepository.find({});
  }

  async findOne(_id: string) {
    return this.UsersRepository.findOne({ _id });
  }

  async update(_id: string, updateUsersDto: UpdateUsersDto, user: UserDTO) {
    return this.UsersRepository.findOneAndUpdate(
      { userId: _id },
      {
        $set: {
          ...updateUsersDto,
          updatedAt: new Date(),
          updatedBy: user?._id,
        },
      },
    );
  }

  async remove(_id: string) {
    return this.UsersRepository.findOneAndDelete({ _id });
  }

  async verifyUser(email: string, password: string) {
    const user = await this.UsersRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid)
      throw new UnauthorizedException('Credentials are not valid');
    return user;
  }
}
