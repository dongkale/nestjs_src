import { hash } from 'bcryptjs';
import { MainEntity } from '@/common/entities/main.entities';
import { BeforeInsert, Column, Entity, Index } from 'typeorm';

@Entity()
export class User extends MainEntity {
  @Index()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  private async hashPassword() {
    if (this.password) {
      this.password = await hash(this.password, 10);
    }
  }
}
