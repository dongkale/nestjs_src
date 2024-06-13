export type TodoId = number;

export class TodoEntity {
  id: TodoId;
  title: string;
  content: string;
  updatedAt?: Date;
  createdAt?: Date;

  constructor(
    id: number,
    title: string,
    content: string,
    updatedAt?: Date,
    createdAt?: Date,
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }

  static make(
    id: number,
    title: string,
    content: string,
    updatedAt?: Date,
    createdAt?: Date,
  ): TodoEntity {
    return new TodoEntity(id, title, content, updatedAt, createdAt);
  }

  // constructor(
  //   private readonly _id: TodoId,
  //   private _title: string,
  //   private readonly _content: string,
  //   private readonly _updatedAt?: Date,
  //   private readonly _createdAt?: Date,
  // ) {}

  // get id() {
  //   return this._id;
  // }

  // get title() {
  //   return this._title;
  // }

  // get content() {
  //   return this._content;
  // }

  // get createdAt() {
  //   return this._createdAt;
  // }

  // get updatedAt() {
  //   return this._updatedAt;
  // }

  static createTodo(title: string, content: string): TodoEntity {
    // return new TodoEntity(0, title, content);
    return TodoEntity.make(0, title, content);
  }

  static updateTodo(title: string, content: string, id: TodoId): TodoEntity {
    // return new TodoEntity(id, title, content);
    return TodoEntity.make(id, title, content);
  }
}
