import { IPJson } from 'src/framework/adapter/output/file/json/ip.json';

export class NetworkJson {
  public constructor(private readonly _ip: IPJson, private readonly _networkName: string, private readonly _cidr: string) {}

  get ip(): IPJson {
    return this._ip;
  }

  get networkName(): string {
    return this._networkName;
  }

  get cidr(): string {
    return this._cidr;
  }
}
