import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { OrganizationsService } from '../organizations/organizations.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './login.dto';
import { UserRole } from '../common/enums/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly organizationsService: OrganizationsService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async orgLogin(dto: LoginDto) {
    const organization = await this.organizationsService.findByEmail(dto.email);
    if (!organization) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(dto.password, organization.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      sub: organization.id,
      type: 'organization',
      organizationId: organization.id,
      role: UserRole.ORG_ADMIN,
      name: organization.organizationName,
      email: organization.email,
    };

    return {
      token: await this.jwtService.signAsync(payload),
      user: payload,
    };
  }

  async userLogin(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !user.password) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      sub: user.id,
      type: 'user',
      organizationId: user.organizationId,
      role: user.role,
      name: user.name,
      email: user.email,
    };

    return {
      token: await this.jwtService.signAsync(payload),
      user: payload,
    };
  }
}
