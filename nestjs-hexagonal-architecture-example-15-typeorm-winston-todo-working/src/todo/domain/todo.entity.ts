export type TodoId = number;

export class TodoEntity {
  constructor(
    private readonly _id: TodoId,
    private _title: string,
    private readonly _content: string,
    private readonly _updatedAt?: Date,
    private readonly _createdAt?: Date,
  ) {}

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get content() {
    return this._content;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  static createTodo(title: string, content: string): TodoEntity {
    return new TodoEntity(0, title, content);
  }

  static updateTodo(title: string, content: string, id: TodoId): TodoEntity {
    return new TodoEntity(id, title, content);
  }
}
