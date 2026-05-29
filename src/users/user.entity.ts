import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Organization } from '../organizations/organization.entity';
import { UserRole } from '../common/enums/user-role.enum';
import { AssetAssignment } from '../assignments/asset-assignment.entity';
import { MaterialIssue } from '../materials/material-issue.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Organization, (organization) => organization.users, { onDelete: 'CASCADE' })
  organization: Organization;

  @Column()
  organizationId: number;

  @Column()
  employeeCode: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  department?: string;

  @Column({ nullable: true })
  designation?: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => AssetAssignment, (assignment) => assignment.user)
  assignments: AssetAssignment[];

  @OneToMany(() => MaterialIssue, (issue) => issue.user)
  materialIssues: MaterialIssue[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
