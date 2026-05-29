import { User } from '../users/user.entity';
import { Asset } from '../assets/asset.entity';
import { Material } from '../materials/material.entity';
export declare class Organization {
    id: number;
    organizationName: string;
    email: string;
    phone: string;
    address?: string;
    logoUrl?: string;
    password: string;
    isActive: boolean;
    users: User[];
    assets: Asset[];
    materials: Material[];
    createdAt: Date;
    updatedAt: Date;
}
