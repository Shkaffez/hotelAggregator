import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createUserDto } from './dto/createUser.Dto';
import { UsersService } from './users.service';
import * as bcript from 'bcrypt';
import { searchUsersDto } from './dto/searchUsers.Dto';

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('/admin/users/')
    public create(@Body() data: createUserDto) {
        const { email, password, name, contactPhone, role } = data;
        const passwordHash = bcript.hashSync(password, 10);
        return this.usersService.create({
            email, passwordHash, name, contactPhone, role,
        });
    }

    @Get('/admin/users/')
    public findAsAdmin(@Param() params: searchUsersDto) {
        return this.usersService.findAll(params);
    }

    @Get('/manager/users/')
    public findAsManager(@Param() params: searchUsersDto) {
        return this.usersService.findAll(params);
    }

}
