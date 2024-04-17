import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'parts' })
export class Part {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id?: number;

  @Column({ unique: true })
  @ApiProperty({ description: '이름' })
  name: string;

  @Column()
  @ApiProperty({ description: '설명' })
  description: string;

  @Column()
  @ApiProperty({ description: '데이터' })
  dataJson: string;

  @CreateDateColumn()
  @ApiProperty({ description: '생성일' })
  createdAt?: Date = new Date();

  @UpdateDateColumn()
  @ApiProperty({ description: '갱신일' })
  updatedAt?: Date;
}
