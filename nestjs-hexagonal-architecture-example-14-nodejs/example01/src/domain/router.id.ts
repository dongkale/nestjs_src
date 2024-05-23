export class RouterId {
  constructor(private readonly _id: string) {}

  public static of(id: string): RouterId {
    return new RouterId(id);
  }

  toString(): string {
    return `RouterId { ${this._id.toString()} }`;
  }
}
