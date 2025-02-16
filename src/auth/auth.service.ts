import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Public } from './decorators/public.decorator';

@Injectable()
export class AuthService {
    constructor(
      private readonly userRepo: UserRepository,
      private readonly jwtService: JwtService
    ) {}


    async loginUser(data: LoginUserDto) {
        const user = await this.userRepo.findByEmailAndPassword(data.email);
        if (!user) {
            throw new UnauthorizedException('Access denieddddddddddddd');
        }

        const isPasswordCorrect = await bcrypt.compare(data.password, user.password);
        console.log(data.password, "data password")
        console.log(user.password, 'user.password')
        console.log(isPasswordCorrect, "isPasswordCorrect")
        if (!isPasswordCorrect) {
            throw new UnauthorizedException('AAAAAAAAAAAAAAccess denied');
        }

        // console.log(user, 'userrrrr')
        const jwtToken = await this.jwtService.signAsync({
            id: user.id,
            email: user.email,
            role: user.role,
            blocked: user.blocked,
        });
        return {
            access_token: jwtToken
        };
    }
}
