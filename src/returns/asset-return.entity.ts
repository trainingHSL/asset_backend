import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Organization } from '../organizations/organization.entity';
import { Asset } from '../assets/asset.entity';
import { User } from '../users/user.entity';
import { AssetAssignment } from '../assignments/asset-assignment.entity';

@Entity('asset_returns')
export class AssetReturn {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Organization, { onDelete: 'CASCADE' })
  organization: Organization;

  @Column()
  organizationId: number;

  @ManyToOne(() => Asset)
  asset: Asset;

  @Column()
  assetId: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => AssetAssignment)
  assignment: AssetAssignment;

  @Column()
  assignmentId: number;

  @Column()
  receivedBy: number;

  @Column({ type: 'date' })
  returnDate: string;

  @Column({ default: 'GOOD' })
  returnCondition: string;

  @Column({ nullable: true })
  damageRemarks?: string;

  @Column({ type: 'text', nullable: true })
  returnSignature?: string;

  @CreateDateColumn()
  createdAt: Date;
}
