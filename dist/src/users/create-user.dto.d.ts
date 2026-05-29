import { UserRole } from '../common/enums/user-role.enum';
export declare class CreateUserDto {
    employeeCode: string;
    name: string;
    email: string;
    phone?: string;
    department?: string;
    designation?: string;
    location?: string;
    password?: string;
    role?: UserRole;
}
