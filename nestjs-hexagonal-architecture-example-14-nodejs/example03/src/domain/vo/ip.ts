import { Protocol } from 'src/domain/vo/protocol';

const IPV4_STRING_LENGTH = 15 as const;

export class IP {
  private readonly _protocol: Protocol;
  private readonly _address: string;

  constructor(address: string) {
    this._protocol = address.length <= IPV4_STRING_LENGTH ? Protocol.IPV4 : Protocol.IPV6;
    this._address = address;
  }

  get protocol(): Protocol {
    return this._protocol;
  }

  get address(): string {
    return this._address;
  }
}
