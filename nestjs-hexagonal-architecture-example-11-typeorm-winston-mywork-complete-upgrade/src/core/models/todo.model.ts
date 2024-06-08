export class Todo {
  constructor(
    public id: number,
    public content: string,
    public isDone: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static make(
    id: number,
    content: string,
    isDone: boolean,
    createdAt: Date,
    updatedAt: Date,
  ): Todo {
    return new Todo(id, content, isDone, createdAt, updatedAt);
  }
}
