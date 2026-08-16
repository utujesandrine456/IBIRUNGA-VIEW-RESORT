import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
    login(body: LoginDto): Promise<{
        accessToken: string;
        admin: {
            id: string;
            email: string;
            name: string | null;
        };
    }>;
}
