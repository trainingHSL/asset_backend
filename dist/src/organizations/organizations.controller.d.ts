import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './create-organization.dto';
export declare class OrganizationsController {
    private readonly organizationsService;
    constructor(organizationsService: OrganizationsService);
    register(dto: CreateOrganizationDto): Promise<{
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
    findOne(id: string): Promise<{
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
