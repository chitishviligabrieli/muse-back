import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){
    }

    @Public()
    @Post('login')
    loginUser(@Body() data:LoginUserDto){
        return this.authService.loginUser(data)
    }
}
