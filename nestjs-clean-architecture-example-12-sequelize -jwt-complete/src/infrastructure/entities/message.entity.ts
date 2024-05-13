import {
  Table,
  Column,
  Model,
  // Unique,
  // Default,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'messages_03' })
export class Message extends Model {
  @Column({ field: 'user_id' }) // 컬럼을 정의합니다.
  userId: number;

  @Column({ field: 'receiver_user_id' })
  receiverUserId: number;

  @Column({ field: 'content' })
  content: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
