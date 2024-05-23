export class Activity {
  constructor(private readonly _srcHost: string, private readonly _dstHost: string) {}

  public toString(): string {
    return `${Activity.name}{ srtHost=${this._srcHost}, distHost=${this._dstHost} }`;
  }
}
