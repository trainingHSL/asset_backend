import { JwtService } from '@nestjs/jwt';
import { OrganizationsService } from '../organizations/organizations.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './login.dto';
import { UserRole } from '../common/enums/user-role.enum';
export declare class AuthService {
    private readonly organizationsService;
    private readonly usersService;
    private readonly jwtService;
    constructor(organizationsService: OrganizationsService, usersService: UsersService, jwtService: JwtService);
    orgLogin(dto: LoginDto): Promise<{
        token: string;
        user: {
            sub: number;
            type: string;
            organizationId: number;
            role: UserRole;
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
            role: UserRole;
            name: string;
            email: string;
        };
    }>;
}
