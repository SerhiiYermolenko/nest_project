import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { CreateUserManagementDto } from './dto/create-user-management.dto';
import { UpdateUserManagementDto } from './dto/update-user-management.dto';
import { UserManagementDocument } from './models/user-management.schema';
import { CurrentUser } from '../../../libs/common/src/decorators/current-user.decorator';
import { JwtAuthGuard, UserDTO } from '@app/common';

@Controller('user-management')
export class UserManagementController {
  constructor(private readonly userManagementService: UserManagementService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createUserManagementDto: CreateUserManagementDto,
    @CurrentUser() user: UserDTO,
  ): Promise<UserManagementDocument> {
    return await this.userManagementService.create(
      createUserManagementDto,
      user,
    );
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(
    @CurrentUser() user: UserManagementDocument,
  ): Promise<UserManagementDocument> {
    return user;
  }

  @Get()
  async findAll(): Promise<UserManagementDocument[]> {
    return await this.userManagementService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserManagementDocument> {
    return await this.userManagementService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserManagementDto: UpdateUserManagementDto,
    @CurrentUser() user: UserDTO,
  ): Promise<UserManagementDocument> {
    return await this.userManagementService.update(
      id,
      updateUserManagementDto,
      user,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserManagementDocument> {
    return await this.userManagementService.remove(id);
  }
}
