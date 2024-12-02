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
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UserDTO, CurrentUser, UsersDocument } from '@app/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Post()
  async create(
    @Body() createUsersDto: CreateUsersDto,
    @CurrentUser() user: UserDTO,
  ): Promise<UsersDocument> {
    return await this.UsersService.create(createUsersDto, user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(
    @CurrentUser() user: UsersDocument,
  ): Promise<UsersDocument> {
    return user;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<UsersDocument[]> {
    console.log('TEST');
    return await this.UsersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<UsersDocument> {
    return await this.UsersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUsersDto: UpdateUsersDto,
    @CurrentUser() user: UserDTO,
  ): Promise<UsersDocument> {
    return await this.UsersService.update(id, updateUsersDto, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<UsersDocument> {
    return await this.UsersService.remove(id);
  }
}
