import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser, JwtUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserRole } from '../common/enums/user-role.enum';
import { CreateReturnDto } from './create-return.dto';
import { ReturnsService } from './returns.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('returns')
export class ReturnsController {
  constructor(private readonly returnsService: ReturnsService) {}

  @Roles(UserRole.ORG_ADMIN, UserRole.ASSET_MANAGER)
  @Post()
  processReturn(@CurrentUser() currentUser: JwtUser, @Body() dto: CreateReturnDto) {
    return this.returnsService.processReturn(currentUser.organizationId, currentUser.sub, dto);
  }

  @Roles(UserRole.ORG_ADMIN, UserRole.ASSET_MANAGER)
  @Get()
  findAll(@CurrentUser() currentUser: JwtUser) {
    return this.returnsService.findAll(currentUser.organizationId);
  }
}
