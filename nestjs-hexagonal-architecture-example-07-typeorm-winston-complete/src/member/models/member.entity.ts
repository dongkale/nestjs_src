import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 128 })
  name: string;

  @Column('varchar', { length: 128 })
  email: string;

  @Column('varchar', { length: 128 })
  phone: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
