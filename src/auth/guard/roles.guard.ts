import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decorator';
import { JwtService } from '@nestjs/jwt';
import { IS_ADMIN_KEY } from '../decorators/is-admin.decorator';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { IS_BLOCKED_KEY } from '../decorators/block.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    // const isBlocked = this.reflector.getAllAndOverride<boolean>(IS_BLOCKED_KEY, [
    //   context.getHandler(),
    //   context.getClass()
    // ]);
    //
    // if (isBlocked) {
    //   throw new UnauthorizedException('Your account is blocked');
    // }

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request.user = payload;

      const blocked = payload.blocked;

      if (blocked) {
        if (token) {
          console.log(token);
        }
        throw new UnauthorizedException('Your account is blocked');
      }

      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      const isAdmin = this.reflector.getAllAndOverride<boolean>(IS_ADMIN_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (isAdmin && payload.role !== 'admin') {
        throw new ForbiddenException('Admin access required');
      }

      if (requiredRoles && !requiredRoles.includes(payload.role)) {
        throw new ForbiddenException('You do not have the required role');
      }

      return true; // Access granted
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractTokenFromHeader(request: any): string | null {
    const authorization = request.headers.authorization;
    if (!authorization) {
      return null;
    }

    const [type, token] = authorization.split(' ');
    return type === 'Bearer' ? token : null;
  }
}
