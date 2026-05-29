import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Organization } from '../organizations/organization.entity';
import { MaterialIssue } from './material-issue.entity';

@Entity('materials')
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Organization, (organization) => organization.materials, { onDelete: 'CASCADE' })
  organization: Organization;

  @Column()
  organizationId: number;

  @Column()
  materialName: string;

  @Column()
  category: string;

  @Column({ nullable: true })
  brand?: string;

  @Column({ default: 'pcs' })
  unit: string;

  @Column({ default: 0 })
  totalQuantity: number;

  @Column({ default: 0 })
  availableQuantity: number;

  @Column({ default: 5 })
  minimumStockLevel: number;

  @Column({ nullable: true })
  location?: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => MaterialIssue, (issue) => issue.material)
  issues: MaterialIssue[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
