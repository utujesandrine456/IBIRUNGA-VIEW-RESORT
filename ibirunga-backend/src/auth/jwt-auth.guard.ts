import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
  role: 'admin';
};

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = AuthUser>(
    err: Error | null,
    user: TUser | false,
    info?: { name?: string; message?: string },
  ): TUser {
    if (err) {
      throw err;
    }
    if (!user) {
      const reason =
        info?.name === 'TokenExpiredError'
          ? 'Session expired. Please sign in again.'
          : info?.name === 'JsonWebTokenError'
            ? 'Invalid authentication token.'
            : 'Authentication required';
      throw new UnauthorizedException(reason);
    }
    return user;
  }
}

/** Ensures the authenticated user has the admin role. */
@Injectable()
export class AdminAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user?: AuthUser }>();
    const user = request.user;
    if (!user) {
      throw new UnauthorizedException('Authentication required');
    }
    if (user.role !== 'admin') {
      throw new ForbiddenException('Admin access required');
    }
    return true;
  }
}
