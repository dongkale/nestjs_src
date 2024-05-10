import { Entity, Column } from 'typeorm';

@Entity({ name: 'authors' })
export class Author {
  @Column()
  firstName?: string;

  @Column()
  lastName?: string;
}
