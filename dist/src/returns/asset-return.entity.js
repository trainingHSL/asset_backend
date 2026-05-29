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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetReturn = void 0;
const typeorm_1 = require("typeorm");
const organization_entity_1 = require("../organizations/organization.entity");
const asset_entity_1 = require("../assets/asset.entity");
const user_entity_1 = require("../users/user.entity");
const asset_assignment_entity_1 = require("../assignments/asset-assignment.entity");
let AssetReturn = class AssetReturn {
};
exports.AssetReturn = AssetReturn;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AssetReturn.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization, { onDelete: 'CASCADE' }),
    __metadata("design:type", organization_entity_1.Organization)
], AssetReturn.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AssetReturn.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => asset_entity_1.Asset),
    __metadata("design:type", asset_entity_1.Asset)
], AssetReturn.prototype, "asset", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AssetReturn.prototype, "assetId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], AssetReturn.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AssetReturn.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => asset_assignment_entity_1.AssetAssignment),
    __metadata("design:type", asset_assignment_entity_1.AssetAssignment)
], AssetReturn.prototype, "assignment", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AssetReturn.prototype, "assignmentId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AssetReturn.prototype, "receivedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], AssetReturn.prototype, "returnDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'GOOD' }),
    __metadata("design:type", String)
], AssetReturn.prototype, "returnCondition", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AssetReturn.prototype, "damageRemarks", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longtext', nullable: true }),
    __metadata("design:type", String)
], AssetReturn.prototype, "returnSignature", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AssetReturn.prototype, "createdAt", void 0);
exports.AssetReturn = AssetReturn = __decorate([
    (0, typeorm_1.Entity)('asset_returns')
], AssetReturn);
//# sourceMappingURL=asset-return.entity.js.map