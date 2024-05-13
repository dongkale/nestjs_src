import { Table, Column, Model, Unique, Default } from 'sequelize-typescript';

@Table({ tableName: 'users_03' })
export class User extends Model {
  @Column
  name: string;

  @Column
  role: string;

  @Unique(true)
  @Column
  email: string;

  @Column
  password: string;

  @Default(true)
  @Column
  active: boolean;
}
