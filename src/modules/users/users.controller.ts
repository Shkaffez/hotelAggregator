import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.Dto';
import { UsersService } from './users.service';
import * as bcript from 'bcrypt';
import { SearchUsersDto } from './dto/searchUsers.Dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/utils/roles.decorator';
import { Role } from 'src/utils/role.enum';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/admin/users/')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  public create(@Body() data: CreateUserDto) {
    const { email, password, name, contactPhone, role } = data;
    const passwordHash = bcript.hashSync(password, 10);
    return this.usersService.create({
      email,
      passwordHash,
      name,
      contactPhone,
      role,
    });
  }

  @Get('/admin/users/')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  public findAsAdmin(@Query() query: SearchUsersDto) {
    return this.usersService.findAll(query);
  }

  @Get('/manager/users/')
  @Roles(Role.Manager)
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  public findAsManager(@Query() query: SearchUsersDto) {
    return this.usersService.findAll(query);
  }
}
