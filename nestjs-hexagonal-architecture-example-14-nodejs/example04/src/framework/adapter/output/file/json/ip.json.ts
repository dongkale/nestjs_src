import { ProtocolJson } from 'src/framework/adapter/output/file/json/protocol.json';

export class IPJson {
  private static IPV4_STRING_LENGTH = 15 as const;
  private readonly _protocol: ProtocolJson;
  private constructor(private readonly _address: string) {
    this._protocol = this._address.length <= IPJson.IPV4_STRING_LENGTH ? ProtocolJson.IPV4 : ProtocolJson.IPV6;
  }

  public static fromAddress(ipAddress: string): IPJson {
    return new IPJson(ipAddress);
  }

  get protocol(): ProtocolJson {
    return this._protocol;
  }

  get address(): string {
    return this._address;
  }
}
