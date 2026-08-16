import { CanActivate, ExecutionContext } from '@nestjs/common';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    handleRequest<T>(err: Error | null, user: T): T;
}
export declare class OptionalJwtAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
export {};
