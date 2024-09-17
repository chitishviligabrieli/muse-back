import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guard/roles.guard';

@Module({
  imports:[UserModule],
  controllers: [AuthController],
  providers: [AuthService,
  //   {
  //   provide: APP_GUARD,
  //   useClass: RolesGuard,
  // }
  ]
  
})
export class AuthModule {}
