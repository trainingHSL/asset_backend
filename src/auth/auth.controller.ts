import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('organization-login')
  orgLogin(@Body() dto: LoginDto) {
    return this.authService.orgLogin(dto);
  }

  @Post('user-login')
  userLogin(@Body() dto: LoginDto) {
    return this.authService.userLogin(dto);
  }
}
