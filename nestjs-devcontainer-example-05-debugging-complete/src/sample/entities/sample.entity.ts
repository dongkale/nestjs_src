import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'samples' })
export class Sample {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'json',
    nullable: true,
    transformer: {
      to(obj: any): string {
        return JSON.parse(obj);
      },
      from(value: any): string {
        return JSON.stringify(value);
      },
    },
  })
  dataJson: string;

  @CreateDateColumn()
  createdAt?: Date = new Date();

  @UpdateDateColumn()
  updatedAt?: Date;
}
