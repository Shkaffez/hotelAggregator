import { Body, Controller, Get, Post, Query, UseGuards, Request } from '@nestjs/common';
import { createUserDto } from './dto/createUser.Dto';
import { UsersService } from './users.service';
import * as bcript from 'bcrypt';
import { searchUsersDto } from './dto/searchUsers.Dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/utils/roles.decorator';
import { Role } from 'src/utils/role.enum';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('/admin/users/')
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    public create(@Body() data: createUserDto) {
        const { email, password, name, contactPhone, role } = data;
        const passwordHash = bcript.hashSync(password, 10);
        return this.usersService.create({
            email, passwordHash, name, contactPhone, role,
        });
    }

    @Get('/admin/users/')
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    public findAsAdmin(@Query() query: searchUsersDto) {
        return this.usersService.findAll(query);
    }

    @Get('/manager/users/')
    @Roles(Role.Manager)
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    public findAsManager(@Query() query: searchUsersDto) {
        return this.usersService.findAll(query);
    }

}
