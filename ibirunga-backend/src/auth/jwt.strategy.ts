import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import type { AuthUser } from './jwt-auth.guard';

type JwtPayload = {
  sub: string;
  email: string;
  role?: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    const secret = config.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET environment variable is required');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
      algorithms: ['HS256'],
    });
  }

  async validate(payload: JwtPayload): Promise<AuthUser> {
    if (!payload?.sub || !payload?.email) {
      throw new UnauthorizedException('Invalid authentication token.');
    }
    if (payload.role && payload.role !== 'admin') {
      throw new UnauthorizedException('Invalid admin token.');
    }

    const admin = await this.prisma.admin.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, name: true },
    });

    if (!admin || admin.email !== payload.email) {
      throw new UnauthorizedException('Admin account not found or revoked.');
    }

    return {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: 'admin',
    };
  }
}
