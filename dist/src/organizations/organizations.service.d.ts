import { Repository } from 'typeorm';
import { Organization } from './organization.entity';
import { CreateOrganizationDto } from './create-organization.dto';
export declare class OrganizationsService {
    private readonly organizationRepo;
    constructor(organizationRepo: Repository<Organization>);
    create(dto: CreateOrganizationDto): Promise<{
        id: number;
        organizationName: string;
        email: string;
        phone: string;
        address?: string;
        logoUrl?: string;
        isActive: boolean;
        users: import("../users/user.entity").User[];
        assets: import("../assets/asset.entity").Asset[];
        materials: import("../materials/material.entity").Material[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByEmail(email: string): Promise<Organization | null>;
    findOne(id: number): Promise<{
        id: number;
        organizationName: string;
        email: string;
        phone: string;
        address?: string;
        logoUrl?: string;
        isActive: boolean;
        users: import("../users/user.entity").User[];
        assets: import("../assets/asset.entity").Asset[];
        materials: import("../materials/material.entity").Material[];
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
