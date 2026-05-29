"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_guard_1 = require("../common/guards/roles.guard");
const user_role_enum_1 = require("../common/enums/user-role.enum");
const assignments_service_1 = require("./assignments.service");
const create_assignment_dto_1 = require("./create-assignment.dto");
const sign_assignment_dto_1 = require("./sign-assignment.dto");
let AssignmentsController = class AssignmentsController {
    constructor(assignmentsService) {
        this.assignmentsService = assignmentsService;
    }
    create(currentUser, dto) {
        return this.assignmentsService.create(currentUser.organizationId, currentUser.sub, dto);
    }
    findAll(currentUser) {
        return this.assignmentsService.findAll(currentUser.organizationId);
    }
    findMine(currentUser) {
        return this.assignmentsService.findMine(currentUser.organizationId, currentUser.sub);
    }
    sign(currentUser, id, dto, req) {
        return this.assignmentsService.sign(currentUser.organizationId, currentUser.sub, +id, dto.digitalSignature, req.ip);
    }
    requestReturn(currentUser, id) {
        return this.assignmentsService.requestReturn(currentUser.organizationId, currentUser.sub, +id);
    }
};
exports.AssignmentsController = AssignmentsController;
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ORG_ADMIN, user_role_enum_1.UserRole.ASSET_MANAGER),
    (0, common_1.Post)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_assignment_dto_1.CreateAssignmentDto]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ORG_ADMIN, user_role_enum_1.UserRole.ASSET_MANAGER),
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my-assets'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "findMine", null);
__decorate([
    (0, common_1.Patch)(':id/sign'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, sign_assignment_dto_1.SignAssignmentDto, Object]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "sign", null);
__decorate([
    (0, common_1.Patch)(':id/request-return'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "requestReturn", null);
exports.AssignmentsController = AssignmentsController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Controller)('assignments'),
    __metadata("design:paramtypes", [assignments_service_1.AssignmentsService])
], AssignmentsController);
//# sourceMappingURL=assignments.controller.js.map