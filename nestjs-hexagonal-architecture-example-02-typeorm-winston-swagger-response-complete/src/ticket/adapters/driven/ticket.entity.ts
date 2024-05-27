import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tickets')
export class TicketEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 128 })
  description: string;

  @Column('varchar', { length: 128 })
  status: string;

  @Column()
  priority: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
