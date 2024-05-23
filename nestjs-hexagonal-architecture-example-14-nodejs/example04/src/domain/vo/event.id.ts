export class EventId {
  private constructor(private readonly _id: string) {}

  public static of(id: string): EventId {
    return new EventId(id);
  }

  public toString(): string {
    return `EventId{ id = ${this._id} }`;
  }
}
