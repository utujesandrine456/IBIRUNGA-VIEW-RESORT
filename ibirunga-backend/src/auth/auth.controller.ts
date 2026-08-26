import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { AdminAuthGuard, JwtAuthGuard, type AuthUser } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  /** Strict limit on login to reduce brute-force attempts */
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post('login')
  login(@Body() body: LoginDto) {
    return this.auth.login(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Get('me')
  me(@Req() req: { user: AuthUser }) {
    return this.auth.me(req.user.id);
  }
}
