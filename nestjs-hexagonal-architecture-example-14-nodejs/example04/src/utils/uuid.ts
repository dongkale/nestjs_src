import { randomUUID as _randomUUID } from 'crypto';
// const UUIDV4Pattern = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

export class UUID {
  private constructor(private _uuid: string) {}

  static randomUUID(): UUID {
    return new UUID(_randomUUID());
  }

  static fromString(id: string): UUID {
    // if (!UUIDV4Pattern.test(id)) throw Error(`${id} is not uuid`);

    return new UUID(id);
  }

  public toString(): string {
    return this._uuid;
  }

  public equals(target: UUID): boolean {
    return this._uuid === target._uuid;
  }
}
