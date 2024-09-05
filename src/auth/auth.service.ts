import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(private readonly userRepo:UserRepository){}
    async loginUser(data:LoginUserDto){
        const user = await this.userRepo.findByEmailAndPassword(data.email)
        if(!user){
            throw new UnauthorizedException("Access denied")
        }
        const isPasswordCorrect = await bcrypt.compare(data.password,user.password)
        if(!isPasswordCorrect){
            throw new UnauthorizedException("Access denied")
        }

        delete user.password

        return user

    }

}
