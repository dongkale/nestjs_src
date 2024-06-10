export type BoardId = number;

export class BoardEntity {
  constructor(
    private _title: string,
    private readonly _content: string,
    private readonly _id: BoardId,
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

  static createBoard(title: string, content: string): BoardEntity {
    return new BoardEntity(title, content, 0);
  }

  static updateBoard(title: string, content: string, id: BoardId): BoardEntity {
    return new BoardEntity(title, content, id);
  }
}
