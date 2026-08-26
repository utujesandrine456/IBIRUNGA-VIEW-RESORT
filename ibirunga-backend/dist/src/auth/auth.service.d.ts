import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    login(email: string, password: string): Promise<{
        accessToken: string;
        tokenType: string;
        expiresIn: string;
        admin: {
            id: string;
            email: string;
            name: string | null;
            role: "admin";
        };
    }>;
    me(adminId: string): Promise<{
        role: "admin";
        id: string;
        email: string;
        name: string | null;
    }>;
}
