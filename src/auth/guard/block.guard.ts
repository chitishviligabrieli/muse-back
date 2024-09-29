import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decorator';
import { IS_BLOCKED_KEY } from '../decorators/block.decorator';

@Injectable()
export class BlockGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    const payload = await this.jwtService.verifyAsync(token);

    request['user'] = payload;

    console.log(payload, "payload")

    console.log(token,  "token")
    const decodedToken = this.jwtService.decode(token);

    console.log(decodedToken.blocked, 'decodedToken');


    try {

      const blocked = this.reflector.getAllAndOverride<string[]>(IS_BLOCKED_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (decodedToken.blocked) {
        throw new UnauthorizedException('Your account is blocked');
      }

      if(!decodedToken.blocked) {
        return true
      }

    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  private extractTokenFromHeader(request: any): string {
    const authorization = request.headers.authorization;
    if (!authorization) {
      return null;
    }

    const [type, token] = authorization.split(' ');
    return type === 'Bearer' ? token : null;
  }
}
