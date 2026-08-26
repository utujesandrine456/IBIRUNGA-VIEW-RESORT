import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { type AuthUser } from './jwt-auth.guard';
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
    login(body: LoginDto): Promise<{
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
    me(req: {
        user: AuthUser;
    }): Promise<{
        role: "admin";
        email: string;
        id: string;
        name: string | null;
    }>;
}
