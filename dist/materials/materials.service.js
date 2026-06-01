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
exports.MaterialsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const material_entity_1 = require("./material.entity");
const material_issue_entity_1 = require("./material-issue.entity");
let MaterialsService = class MaterialsService {
    constructor(materialRepo, materialIssueRepo, userRepo) {
        this.materialRepo = materialRepo;
        this.materialIssueRepo = materialIssueRepo;
        this.userRepo = userRepo;
    }
    create(organizationId, dto) {
        return this.materialRepo.save(this.materialRepo.create({
            ...dto,
            organizationId,
            availableQuantity: dto.totalQuantity,
        }));
    }
    findAll(organizationId) {
        return this.materialRepo.find({ where: { organizationId }, order: { createdAt: 'DESC' } });
    }
    async inventory(organizationId) {
        const materials = await this.materialRepo.find({
            where: { organizationId },
            relations: { issues: true },
            order: { createdAt: 'DESC' },
        });
        return materials.map((material) => {
            const totalIssuedQuantity = material.issues?.reduce((sum, issue) => sum + Number(issue.quantity || 0), 0) || 0;
            const currentIssuedQuantity = Math.max(Number(material.totalQuantity || 0) - Number(material.availableQuantity || 0), 0);
            const stockStatus = material.availableQuantity <= 0
                ? 'OUT_OF_STOCK'
                : material.availableQuantity <= material.minimumStockLevel
                    ? 'LOW_STOCK'
                    : 'IN_STOCK';
            const stockPercentage = material.totalQuantity > 0 ? Math.round((material.availableQuantity / material.totalQuantity) * 100) : 0;
            const { issues, ...materialData } = material;
            return {
                ...materialData,
                currentIssuedQuantity,
                totalIssuedQuantity,
                stockStatus,
                stockPercentage,
            };
        });
    }
    async issue(organizationId, issuedBy, dto) {
        const material = await this.materialRepo.findOne({ where: { id: dto.materialId, organizationId } });
        if (!material)
            throw new common_1.NotFoundException('Material not found');
        if (material.availableQuantity < dto.quantity)
            throw new common_1.BadRequestException('Insufficient material stock');
        const user = await this.userRepo.findOne({ where: { id: dto.userId, organizationId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        material.availableQuantity -= dto.quantity;
        await this.materialRepo.save(material);
        return this.materialIssueRepo.save(this.materialIssueRepo.create({
            organizationId,
            materialId: dto.materialId,
            userId: dto.userId,
            quantity: dto.quantity,
            issuedBy,
            remarks: dto.remarks,
        }));
    }
    issues(organizationId) {
        return this.materialIssueRepo.find({
            where: { organizationId },
            relations: { material: true, user: true, issuedByUser: true },
            order: { issueDate: 'DESC' },
        });
    }
};
exports.MaterialsService = MaterialsService;
exports.MaterialsService = MaterialsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(material_entity_1.Material)),
    __param(1, (0, typeorm_1.InjectRepository)(material_issue_entity_1.MaterialIssue)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MaterialsService);
//# sourceMappingURL=materials.service.js.map