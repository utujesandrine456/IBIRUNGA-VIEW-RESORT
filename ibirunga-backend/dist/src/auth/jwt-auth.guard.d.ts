import { CanActivate, ExecutionContext } from '@nestjs/common';
export type AuthUser = {
    id: string;
    email: string;
    name: string | null;
    role: 'admin';
};
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    handleRequest<TUser = AuthUser>(err: Error | null, user: TUser | false, info?: {
        name?: string;
        message?: string;
    }): TUser;
}
export declare class AdminAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
export {};
