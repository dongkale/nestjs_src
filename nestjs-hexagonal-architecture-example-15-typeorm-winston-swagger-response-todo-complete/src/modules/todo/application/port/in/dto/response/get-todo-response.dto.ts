import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TodoEntity, TodoId } from '@/todo/domain/todo.entity';

export class GetTodoResponse {
  @ApiProperty({
    description: 'id',
    type: Number,
    name: 'id',
    default: 0,
  })
  @Exclude()
  private readonly _id: TodoId;

  @ApiProperty({
    description: '제목',
    type: String,
    name: 'title',
    default: 'title',
  })
  @Exclude()
  private readonly _title: string;

  @ApiProperty({
    description: '내용',
    type: String,
    name: 'content',
    default: 'content',
  })
  @Exclude()
  private readonly _content: string;

  @ApiProperty({
    description: '생성일',
    type: Date,
    name: 'createdAt',
  })
  @Exclude()
  private readonly _createdAt?: Date;

  @ApiProperty({
    description: '갱신일',
    type: Date,
    name: 'updatedAt',
  })
  @Exclude()
  private readonly _updatedAt?: Date;

  constructor(todoEntity: TodoEntity) {
    this._id = todoEntity.id;
    this._title = todoEntity.title;
    this._content = todoEntity.content;
    this._createdAt = todoEntity.createdAt;
    this._updatedAt = todoEntity.updatedAt;
  }

  static make(todoEntity: TodoEntity) {
    return new GetTodoResponse(todoEntity);
  }

  @Expose()
  get id() {
    return this._id;
  }

  @Expose()
  get title() {
    return this._title;
  }

  @Expose()
  get content() {
    return this._content;
  }

  @Expose()
  get createdAt() {
    return this._createdAt?.toLocaleString();
  }

  @Expose()
  get updatedAt() {
    return this._updatedAt?.toLocaleString();
  }
}
