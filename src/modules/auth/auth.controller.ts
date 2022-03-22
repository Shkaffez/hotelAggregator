import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  UseFilters,
  Get,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginGuard } from 'src/guards/login.guard';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { AuthService } from './auth.service';
import * as bcript from 'bcrypt';
import { MongoExceptionFilter } from 'src/utils/mongoExceptionFilter';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/schemas/user.schema';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LoginGuard)
  @Post('/auth/login')
  @ApiResponse({ status: 200, description: 'login success' })
  async login() {
    return { status: 'login success' };
  }

  @Post('/client/register')
  @UseFilters(MongoExceptionFilter)
  @ApiResponse({ status: 200, description: 'The user has been created', type: User })
  async singup(@Body() data: CreateUserDto): Promise<Partial<User>> {
    const { email, password, name, contactPhone } = data;
    const passwordHash = bcript.hashSync(password, 10);

    return this.authService.signup({ email, passwordHash, name, contactPhone });
  }

  @Get('/auth/logout')
  @ApiResponse({ status: 200, description: 'logout' })
  logout(@Request() req, @Res() res: Response) {
    req.logout();
    return { status: 'logout' };
  }
}
