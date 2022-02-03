import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcript from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && bcript.compareSync(password, user.passwordHash)) {
            const { passwordHash, ...result } = user;
            return result;
        }
        return null;
    }
}
