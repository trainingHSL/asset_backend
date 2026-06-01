import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Asset } from '../assets/asset.entity';
import { User } from '../users/user.entity';
import { Organization } from '../organizations/organization.entity';
import { AssignmentStatus } from '../common/enums/assignment-status.enum';

@Entity('asset_assignments')
export class AssetAssignment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Organization, { onDelete: 'CASCADE' })
  organization: Organization;

  @Column()
  organizationId: number;

  @ManyToOne(() => Asset, (asset) => asset.assignments)
  asset: Asset;

  @Column()
  assetId: number;

  @ManyToOne(() => User, (user) => user.assignments)
  user: User;

  @Column()
  userId: number;

  @Column()
  assignedBy: number;

  @Column({ type: 'date' })
  assignedDate: string;

  @Column({ type: 'date', nullable: true })
  expectedReturnDate?: string;

  @Column({ type: 'text', nullable: true })
  digitalSignature?: string;

  @Column({ nullable: true })
  signedIpAddress?: string;

  @Column({ type: 'timestamp', nullable: true })
  signatureDate?: Date;

  @Column({ type: 'enum', enum: AssignmentStatus, enumName: 'assignment_status_enum', default: AssignmentStatus.PENDING_SIGNATURE })
  status: AssignmentStatus;

  @Column({ nullable: true })
  remarks?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
