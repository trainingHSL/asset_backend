import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser, JwtUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { AssetStatus } from '../common/enums/asset-status.enum';
import { UserRole } from '../common/enums/user-role.enum';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './create-asset.dto';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Roles(UserRole.ORG_ADMIN, UserRole.ASSET_MANAGER)
  @Post()
  create(@CurrentUser() currentUser: JwtUser, @Body() dto: CreateAssetDto) {
    return this.assetsService.create(currentUser.organizationId, dto);
  }

  @Get()
  findAll(@CurrentUser() currentUser: JwtUser, @Query('status') status?: AssetStatus) {
    return this.assetsService.findAll(currentUser.organizationId, status);
  }

  @Get(':id')
  findOne(@CurrentUser() currentUser: JwtUser, @Param('id') id: string) {
    return this.assetsService.findOne(currentUser.organizationId, +id);
  }
}
