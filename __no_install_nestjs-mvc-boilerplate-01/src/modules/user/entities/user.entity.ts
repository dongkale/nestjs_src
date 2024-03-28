import { AppRoles } from '@/app.roles';
import { jwtExpiresIn, jwtSecretKey } from '@/config';
import { JwtUser } from '@/shared';
import { IUserModel } from '@user/dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity implements IUserModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    address: string;

    @Column({ type: 'text', unique: true })
    username: string;

    @Column({ type: 'text', unique: true })
    email: string;

    @Column({ type: 'text', nullable: true })
    avatarUrl: string;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text' })
    password: string;

    @Column({ type: 'text' })
    phoneNumber: string;

    @Column({
      name: 'roles',
      type: 'enum',
      enum: AppRoles,
      default: AppRoles.MANAGER
    })
    roles: AppRoles;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
      this.password = await bcrypt.hash(this.password, 10);
    }

    @BeforeInsert()
    setDefaultName(): void {
      this.name = this.username || this.email;
    }

    async comparePassword(attempt: string): Promise<boolean> {
      return await bcrypt.compare(attempt, this.password);
    }

    get token(): string {
      const { id, username, roles, email }: JwtUser = this;
      return jwt.sign(
        { id, username, roles, email: email ? email : undefined },
        jwtSecretKey,
        { expiresIn: jwtExpiresIn },
      );
    }
}
