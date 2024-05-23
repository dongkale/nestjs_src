import { IP } from 'src/domain/vo/ip';
import { Protocol } from 'src/domain/vo/protocol';

export class Network {
  public constructor(private readonly _address: IP, private readonly _name: string, private readonly _cidr: number) {
    const validateCIDR = (): boolean => Number.isInteger(this._cidr) && this._cidr >= 1 && this._cidr <= 32;
    if (!validateCIDR()) throw new Error('Invalid CIDR value');
  }

  get address(): IP {
    return this._address;
  }

  get name(): string {
    return this._name;
  }

  get cidr(): number {
    return this._cidr;
  }

  public toString(): string {
    return `
                  Network {
                    address: ${this._address.address}(${Protocol[this._address.protocol]}),
                    name: ${this._name},
                    cird: ${this._cidr}
                  }
    `;
  }
}
