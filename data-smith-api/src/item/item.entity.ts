import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'items' })
export class Item {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true, name: 'name' })
  name: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'data_json' })
  dataJson: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date = new Date();

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
