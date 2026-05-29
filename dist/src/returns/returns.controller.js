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
exports.ReturnsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_guard_1 = require("../common/guards/roles.guard");
const user_role_enum_1 = require("../common/enums/user-role.enum");
const create_return_dto_1 = require("./create-return.dto");
const returns_service_1 = require("./returns.service");
let ReturnsController = class ReturnsController {
    constructor(returnsService) {
        this.returnsService = returnsService;
    }
    processReturn(currentUser, dto) {
        return this.returnsService.processReturn(currentUser.organizationId, currentUser.sub, dto);
    }
    findAll(currentUser) {
        return this.returnsService.findAll(currentUser.organizationId);
    }
};
exports.ReturnsController = ReturnsController;
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ORG_ADMIN, user_role_enum_1.UserRole.ASSET_MANAGER),
    (0, common_1.Post)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_return_dto_1.CreateReturnDto]),
    __metadata("design:returntype", void 0)
], ReturnsController.prototype, "processReturn", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ORG_ADMIN, user_role_enum_1.UserRole.ASSET_MANAGER),
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReturnsController.prototype, "findAll", null);
exports.ReturnsController = ReturnsController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Controller)('returns'),
    __metadata("design:paramtypes", [returns_service_1.ReturnsService])
], ReturnsController);
//# sourceMappingURL=returns.controller.js.map