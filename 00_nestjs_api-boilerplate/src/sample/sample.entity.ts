import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'samples' })
export class Sample {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id?: number;

  @Column({ unique: true, name: 'name' })
  @ApiProperty({ description: '이름' })
  name: string;

  @Column({ name: 'description' })
  @ApiProperty({ description: '설명' })
  description: string;

  @Column({ name: 'data_json' })
  @ApiProperty({ description: '데이터' })
  dataJson: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ description: '생성일' })
  createdAt: Date = new Date();

  @CreateDateColumn({ name: 'updated_at' })
  @ApiProperty({ description: '갱신일' })
  updatedAt: Date;
}
