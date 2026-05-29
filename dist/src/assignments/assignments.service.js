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
exports.AssignmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const asset_entity_1 = require("../assets/asset.entity");
const asset_status_enum_1 = require("../common/enums/asset-status.enum");
const assignment_status_enum_1 = require("../common/enums/assignment-status.enum");
const user_entity_1 = require("../users/user.entity");
const asset_assignment_entity_1 = require("./asset-assignment.entity");
let AssignmentsService = class AssignmentsService {
    constructor(assignmentRepo, assetRepo, userRepo) {
        this.assignmentRepo = assignmentRepo;
        this.assetRepo = assetRepo;
        this.userRepo = userRepo;
    }
    async create(organizationId, assignedBy, dto) {
        const asset = await this.assetRepo.findOne({ where: { id: dto.assetId, organizationId } });
        if (!asset)
            throw new common_1.NotFoundException('Asset not found');
        if (asset.status !== asset_status_enum_1.AssetStatus.AVAILABLE)
            throw new common_1.BadRequestException('Asset is not available');
        const user = await this.userRepo.findOne({ where: { id: dto.userId, organizationId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const assignment = await this.assignmentRepo.save(this.assignmentRepo.create({
            ...dto,
            organizationId,
            assignedBy,
            status: assignment_status_enum_1.AssignmentStatus.PENDING_SIGNATURE,
        }));
        asset.status = asset_status_enum_1.AssetStatus.ASSIGNED;
        await this.assetRepo.save(asset);
        return this.findOne(organizationId, assignment.id);
    }
    findAll(organizationId) {
        return this.assignmentRepo.find({
            where: { organizationId },
            relations: { asset: true, user: true },
            order: { createdAt: 'DESC' },
        });
    }
    findMine(organizationId, userId) {
        return this.assignmentRepo.find({
            where: { organizationId, userId },
            relations: { asset: true },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(organizationId, id) {
        const assignment = await this.assignmentRepo.findOne({
            where: { organizationId, id },
            relations: { asset: true, user: true },
        });
        if (!assignment)
            throw new common_1.NotFoundException('Assignment not found');
        return assignment;
    }
    async sign(organizationId, userId, id, digitalSignature, ip) {
        const assignment = await this.assignmentRepo.findOne({ where: { organizationId, id, userId } });
        if (!assignment)
            throw new common_1.NotFoundException('Assignment not found');
        if (assignment.status !== assignment_status_enum_1.AssignmentStatus.PENDING_SIGNATURE) {
            throw new common_1.BadRequestException('Assignment cannot be signed now');
        }
        assignment.digitalSignature = digitalSignature;
        assignment.signedIpAddress = ip;
        assignment.signatureDate = new Date();
        assignment.status = assignment_status_enum_1.AssignmentStatus.ASSIGNED;
        return this.assignmentRepo.save(assignment);
    }
    async requestReturn(organizationId, userId, id) {
        const assignment = await this.assignmentRepo.findOne({ where: { organizationId, id, userId } });
        if (!assignment)
            throw new common_1.NotFoundException('Assignment not found');
        assignment.status = assignment_status_enum_1.AssignmentStatus.RETURN_REQUESTED;
        return this.assignmentRepo.save(assignment);
    }
};
exports.AssignmentsService = AssignmentsService;
exports.AssignmentsService = AssignmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(asset_assignment_entity_1.AssetAssignment)),
    __param(1, (0, typeorm_1.InjectRepository)(asset_entity_1.Asset)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AssignmentsService);
//# sourceMappingURL=assignments.service.js.map