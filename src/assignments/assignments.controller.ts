import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CurrentUser, JwtUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserRole } from '../common/enums/user-role.enum';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './create-assignment.dto';
import { SignAssignmentDto } from './sign-assignment.dto';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Roles(UserRole.ORG_ADMIN, UserRole.ASSET_MANAGER)
  @Post()
  create(@CurrentUser() currentUser: JwtUser, @Body() dto: CreateAssignmentDto) {
    return this.assignmentsService.create(currentUser.organizationId, currentUser.sub, dto);
  }

  @Roles(UserRole.ORG_ADMIN, UserRole.ASSET_MANAGER)
  @Get()
  findAll(@CurrentUser() currentUser: JwtUser) {
    return this.assignmentsService.findAll(currentUser.organizationId);
  }

  @Get('my-assets')
  findMine(@CurrentUser() currentUser: JwtUser) {
    return this.assignmentsService.findMine(currentUser.organizationId, currentUser.sub);
  }

  @Patch(':id/sign')
  sign(@CurrentUser() currentUser: JwtUser, @Param('id') id: string, @Body() dto: SignAssignmentDto, @Req() req: Request) {
    return this.assignmentsService.sign(currentUser.organizationId, currentUser.sub, +id, dto.digitalSignature, req.ip);
  }

  @Patch(':id/request-return')
  requestReturn(@CurrentUser() currentUser: JwtUser, @Param('id') id: string) {
    return this.assignmentsService.requestReturn(currentUser.organizationId, currentUser.sub, +id);
  }
}
