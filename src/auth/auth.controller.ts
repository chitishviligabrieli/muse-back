import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { IS_PUBLIC_KEY, Public } from './decorators/public.decorator';
import { RolesGuard } from './guard/roles.guard';
import { BlockGuard } from './guard/block.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){
    }

    @UseGuards(RolesGuard, BlockGuard)
    @Public()
    @Post('login')
    loginUser(@Body() data:LoginUserDto){
        return this.authService.loginUser(data)
    }
}
