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
exports.AssetAssignment = void 0;
const typeorm_1 = require("typeorm");
const asset_entity_1 = require("../assets/asset.entity");
const user_entity_1 = require("../users/user.entity");
const organization_entity_1 = require("../organizations/organization.entity");
const assignment_status_enum_1 = require("../common/enums/assignment-status.enum");
let AssetAssignment = class AssetAssignment {
};
exports.AssetAssignment = AssetAssignment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AssetAssignment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization, { onDelete: 'CASCADE' }),
    __metadata("design:type", organization_entity_1.Organization)
], AssetAssignment.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AssetAssignment.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => asset_entity_1.Asset, (asset) => asset.assignments),
    __metadata("design:type", asset_entity_1.Asset)
], AssetAssignment.prototype, "asset", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AssetAssignment.prototype, "assetId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.assignments),
    __metadata("design:type", user_entity_1.User)
], AssetAssignment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AssetAssignment.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AssetAssignment.prototype, "assignedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], AssetAssignment.prototype, "assignedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], AssetAssignment.prototype, "expectedReturnDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longtext', nullable: true }),
    __metadata("design:type", String)
], AssetAssignment.prototype, "digitalSignature", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AssetAssignment.prototype, "signedIpAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], AssetAssignment.prototype, "signatureDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: assignment_status_enum_1.AssignmentStatus, default: assignment_status_enum_1.AssignmentStatus.PENDING_SIGNATURE }),
    __metadata("design:type", String)
], AssetAssignment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AssetAssignment.prototype, "remarks", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AssetAssignment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AssetAssignment.prototype, "updatedAt", void 0);
exports.AssetAssignment = AssetAssignment = __decorate([
    (0, typeorm_1.Entity)('asset_assignments')
], AssetAssignment);
//# sourceMappingURL=asset-assignment.entity.js.map