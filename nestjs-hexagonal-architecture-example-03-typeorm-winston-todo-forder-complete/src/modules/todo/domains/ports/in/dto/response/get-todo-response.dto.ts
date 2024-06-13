import { TodoEntity, TodoId } from '@/todo/domains/entities/todo.entity';
import { Exclude, Expose } from 'class-transformer';

export class GetTodoResponse {
  @Exclude() private readonly _id: TodoId;
  @Exclude() private readonly _title: string;
  @Exclude() private readonly _content: string;
  @Exclude() private readonly _createdAt?: Date;
  @Exclude() private readonly _updatedAt?: Date;

  constructor(todoEntity: TodoEntity) {
    this._id = todoEntity.id;
    this._title = todoEntity.title;
    this._content = todoEntity.content;
    this._createdAt = todoEntity.createdAt;
    this._updatedAt = todoEntity.updatedAt;
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

  static make(todoEntity: TodoEntity) {
    return new GetTodoResponse(todoEntity);
  }
}
