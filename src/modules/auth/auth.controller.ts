import { Controller, Request, Post, UseGuards, Body, UseFilters } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guards/local.auth.guard';
import { createUserDto } from '../users/dto/createUser.Dto';
import { AuthService } from './auth.service';
import * as bcript from 'bcrypt';
import { MongoExceptionFilter } from 'src/utils/mongoExceptionFilter';


@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/client/register')
  @UseFilters(MongoExceptionFilter)
  async singup(
    @Body() data: createUserDto) {
    const { email, password, name, contactPhone } = data;
    const passwordHash = bcript.hashSync(password, 10);

    return this.authService.signup({ email, passwordHash, name, contactPhone });

  }
}
