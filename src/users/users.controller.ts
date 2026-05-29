import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import 'multer';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser, JwtUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserRole } from '../common/enums/user-role.enum';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(UserRole.ORG_ADMIN, UserRole.ASSET_MANAGER)
  @Post()
  create(@CurrentUser() currentUser: JwtUser, @Body() dto: CreateUserDto) {
    return this.usersService.create(currentUser.organizationId, dto);
  }

  @Roles(UserRole.ORG_ADMIN, UserRole.ASSET_MANAGER)
  @Post('import-excel')
  @UseInterceptors(FileInterceptor('file'))
  importExcel(@CurrentUser() currentUser: JwtUser, @UploadedFile() file: Express.Multer.File) {
    return this.usersService.importFromExcel(currentUser.organizationId, file.buffer);
  }

  @Roles(UserRole.ORG_ADMIN, UserRole.ASSET_MANAGER)
  @Post('sync-api')
  syncApi(@CurrentUser() currentUser: JwtUser, @Body() body: { users: CreateUserDto[] }) {
    return this.usersService.syncFromApi(currentUser.organizationId, body.users || []);
  }

  @Get()
  findAll(@CurrentUser() currentUser: JwtUser) {
    return this.usersService.findAll(currentUser.organizationId);
  }

  @Get(':id')
  findOne(@CurrentUser() currentUser: JwtUser, @Param('id') id: string) {
    return this.usersService.findOne(currentUser.organizationId, +id);
  }
}
