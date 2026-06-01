import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Organization } from '../organizations/organization.entity';
import { AssetStatus } from '../common/enums/asset-status.enum';
import { AssetAssignment } from '../assignments/asset-assignment.entity';

@Entity('assets')
@Index(['organizationId', 'assetCode'], { unique: true })
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Organization, (organization) => organization.assets, { onDelete: 'CASCADE' })
  organization: Organization;

  @Column()
  organizationId: number;

  @Column()
  assetCode: string;

  @Column()
  assetName: string;

  @Column()
  assetType: string;

  @Column({ nullable: true })
  brand?: string;

  @Column({ nullable: true })
  model?: string;

  @Column({ nullable: true })
  serialNumber?: string;

  @Column({ type: 'date', nullable: true })
  purchaseDate?: string;

  @Column({ type: 'date', nullable: true })
  warrantyEndDate?: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  conditionNote?: string;

  @Column({ type: 'enum', enum: AssetStatus, enumName: 'asset_status_enum', default: AssetStatus.AVAILABLE })
  status: AssetStatus;

  @Column({ nullable: true })
  remarks?: string;

  @OneToMany(() => AssetAssignment, (assignment) => assignment.asset)
  assignments: AssetAssignment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
