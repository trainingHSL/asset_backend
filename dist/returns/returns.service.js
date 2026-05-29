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
exports.ReturnsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const asset_entity_1 = require("../assets/asset.entity");
const asset_assignment_entity_1 = require("../assignments/asset-assignment.entity");
const assignment_status_enum_1 = require("../common/enums/assignment-status.enum");
const asset_status_enum_1 = require("../common/enums/asset-status.enum");
const asset_return_entity_1 = require("./asset-return.entity");
let ReturnsService = class ReturnsService {
    constructor(returnRepo, assignmentRepo, assetRepo) {
        this.returnRepo = returnRepo;
        this.assignmentRepo = assignmentRepo;
        this.assetRepo = assetRepo;
    }
    async processReturn(organizationId, receivedBy, dto) {
        const assignment = await this.assignmentRepo.findOne({
            where: { organizationId, id: dto.assignmentId },
            relations: { asset: true, user: true },
        });
        if (!assignment)
            throw new common_1.NotFoundException('Assignment not found');
        if (assignment.status === assignment_status_enum_1.AssignmentStatus.RETURNED)
            throw new common_1.BadRequestException('Asset already returned');
        const returnRecord = await this.returnRepo.save(this.returnRepo.create({
            organizationId,
            assignmentId: assignment.id,
            assetId: assignment.assetId,
            userId: assignment.userId,
            receivedBy,
            returnDate: dto.returnDate,
            returnCondition: dto.returnCondition,
            damageRemarks: dto.damageRemarks,
            returnSignature: dto.returnSignature,
        }));
        assignment.status = assignment_status_enum_1.AssignmentStatus.RETURNED;
        await this.assignmentRepo.save(assignment);
        const asset = await this.assetRepo.findOne({ where: { id: assignment.assetId, organizationId } });
        if (asset) {
            asset.status = dto.returnCondition === 'GOOD' ? asset_status_enum_1.AssetStatus.AVAILABLE : asset_status_enum_1.AssetStatus.DAMAGED;
            asset.conditionNote = dto.damageRemarks || dto.returnCondition;
            await this.assetRepo.save(asset);
        }
        return returnRecord;
    }
    findAll(organizationId) {
        return this.returnRepo.find({
            where: { organizationId },
            relations: { asset: true, user: true, assignment: true },
            order: { createdAt: 'DESC' },
        });
    }
};
exports.ReturnsService = ReturnsService;
exports.ReturnsService = ReturnsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(asset_return_entity_1.AssetReturn)),
    __param(1, (0, typeorm_1.InjectRepository)(asset_assignment_entity_1.AssetAssignment)),
    __param(2, (0, typeorm_1.InjectRepository)(asset_entity_1.Asset)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReturnsService);
//# sourceMappingURL=returns.service.js.map