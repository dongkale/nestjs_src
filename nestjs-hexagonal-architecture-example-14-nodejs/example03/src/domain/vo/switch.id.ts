import { UUID } from 'src/utils/uuid';

export class SwitchId {
  constructor(private readonly _id: UUID) {}

  public static withId(id: string): SwitchId {
    return new SwitchId(UUID.fromString(id));
  }

  public static withoutId(): SwitchId {
    return new SwitchId(UUID.randomUUID());
  }

  toString(): UUID {
    return this._id;
  }
}
