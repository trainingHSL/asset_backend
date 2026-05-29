import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    orgLogin(dto: LoginDto): Promise<{
        token: string;
        user: {
            sub: number;
            type: string;
            organizationId: number;
            role: import("../common/enums/user-role.enum").UserRole;
            name: string;
            email: string;
        };
    }>;
    userLogin(dto: LoginDto): Promise<{
        token: string;
        user: {
            sub: number;
            type: string;
            organizationId: number;
            role: import("../common/enums/user-role.enum").UserRole;
            name: string;
            email: string;
        };
    }>;
}
