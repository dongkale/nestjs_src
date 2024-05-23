import { UUID } from 'src/utils/uuid';

export class RouterId {
  constructor(private readonly _id: UUID) {}

  public static withId(id: string): RouterId {
    return new RouterId(UUID.fromString(id));
  }

  public static withoutId(): RouterId {
    return new RouterId(UUID.randomUUID());
  }

  public getId(): UUID {
    return this._id;
  }

  toString(): string {
    return this._id.toString();
  }
}
