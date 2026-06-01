import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser, JwtUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserRole } from '../common/enums/user-role.enum';
import { CreateMaterialDto } from './create-material.dto';
import { IssueMaterialDto } from './issue-material.dto';
import { MaterialsService } from './materials.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Roles(UserRole.ORG_ADMIN, UserRole.ASSET_MANAGER)
  @Post()
  create(@CurrentUser() currentUser: JwtUser, @Body() dto: CreateMaterialDto) {
    return this.materialsService.create(currentUser.organizationId, dto);
  }

  @Roles(UserRole.ORG_ADMIN, UserRole.ASSET_MANAGER)
  @Post('issue')
  issue(@CurrentUser() currentUser: JwtUser, @Body() dto: IssueMaterialDto) {
    return this.materialsService.issue(currentUser.organizationId, currentUser.sub, dto);
  }

  @Get()
  findAll(@CurrentUser() currentUser: JwtUser) {
    return this.materialsService.findAll(currentUser.organizationId);
  }

  @Roles(UserRole.ORG_ADMIN, UserRole.ASSET_MANAGER)
  @Get('inventory')
  inventory(@CurrentUser() currentUser: JwtUser) {
    return this.materialsService.inventory(currentUser.organizationId);
  }

  @Roles(UserRole.ORG_ADMIN, UserRole.ASSET_MANAGER)
  @Get('issues')
  issues(@CurrentUser() currentUser: JwtUser) {
    return this.materialsService.issues(currentUser.organizationId);
  }
}
