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

@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LoginGuard)
  @Post('/auth/login')
  async login() {
    return { status: 'login success ' };
  }

  @Post('/client/register')
  @UseFilters(MongoExceptionFilter)
  async singup(@Body() data: CreateUserDto) {
    const { email, password, name, contactPhone } = data;
    const passwordHash = bcript.hashSync(password, 10);

    return this.authService.signup({ email, passwordHash, name, contactPhone });
  }

  @Get('/auth/logout')
  logout(@Request() req, @Res() res: Response) {
    req.logout();
    return { status: 'logout' };
  }
}
