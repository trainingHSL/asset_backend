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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const asset_entity_1 = require("../assets/asset.entity");
const asset_assignment_entity_1 = require("../assignments/asset-assignment.entity");
const asset_return_entity_1 = require("../returns/asset-return.entity");
const material_entity_1 = require("../materials/material.entity");
const material_issue_entity_1 = require("../materials/material-issue.entity");
const user_entity_1 = require("../users/user.entity");
const asset_status_enum_1 = require("../common/enums/asset-status.enum");
let ReportsService = class ReportsService {
    constructor(userRepo, assetRepo, assignmentRepo, returnRepo, materialRepo, materialIssueRepo) {
        this.userRepo = userRepo;
        this.assetRepo = assetRepo;
        this.assignmentRepo = assignmentRepo;
        this.returnRepo = returnRepo;
        this.materialRepo = materialRepo;
        this.materialIssueRepo = materialIssueRepo;
    }
    async dashboard(organizationId) {
        const [users, assets, assignedAssets, availableAssets, returns, materials, materialIssues, issuedMaterialQuantity, lowStockMaterials] = await Promise.all([
            this.userRepo.count({ where: { organizationId } }),
            this.assetRepo.count({ where: { organizationId } }),
            this.assetRepo.count({ where: { organizationId, status: asset_status_enum_1.AssetStatus.ASSIGNED } }),
            this.assetRepo.count({ where: { organizationId, status: asset_status_enum_1.AssetStatus.AVAILABLE } }),
            this.returnRepo.count({ where: { organizationId } }),
            this.materialRepo.count({ where: { organizationId } }),
            this.materialIssueRepo.count({ where: { organizationId } }),
            this.materialIssueRepo
                .createQueryBuilder('issue')
                .select('COALESCE(SUM(issue.quantity), 0)', 'total')
                .where('issue.organizationId = :organizationId', { organizationId })
                .getRawOne(),
            this.materialRepo
                .createQueryBuilder('material')
                .where('material.organizationId = :organizationId', { organizationId })
                .andWhere('material.availableQuantity <= material.minimumStockLevel')
                .getCount(),
        ]);
        return {
            users,
            assets,
            assignedAssets,
            availableAssets,
            returns,
            materials,
            materialIssues,
            issuedMaterialQuantity: Number(issuedMaterialQuantity?.total || 0),
            lowStockMaterials,
        };
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(asset_entity_1.Asset)),
    __param(2, (0, typeorm_1.InjectRepository)(asset_assignment_entity_1.AssetAssignment)),
    __param(3, (0, typeorm_1.InjectRepository)(asset_return_entity_1.AssetReturn)),
    __param(4, (0, typeorm_1.InjectRepository)(material_entity_1.Material)),
    __param(5, (0, typeorm_1.InjectRepository)(material_issue_entity_1.MaterialIssue)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReportsService);
//# sourceMappingURL=reports.service.js.map