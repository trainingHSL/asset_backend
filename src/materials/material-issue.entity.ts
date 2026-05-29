import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Organization } from '../organizations/organization.entity';
import { Material } from './material.entity';
import { User } from '../users/user.entity';

@Entity('material_issues')
export class MaterialIssue {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Organization, { onDelete: 'CASCADE' })
  organization: Organization;

  @Column()
  organizationId: number;

  @ManyToOne(() => Material, (material) => material.issues)
  material: Material;

  @Column()
  materialId: number;

  @ManyToOne(() => User, (user) => user.materialIssues)
  user: User;

  @Column()
  userId: number;

  @Column()
  quantity: number;

  @Column()
  issuedBy: number;

  @Column({ nullable: true })
  remarks?: string;

  @CreateDateColumn()
  issueDate: Date;
}
