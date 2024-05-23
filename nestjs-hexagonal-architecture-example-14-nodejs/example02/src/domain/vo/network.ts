import { IP } from 'src/domain/vo/ip';

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
    return this.cidr;
  }
}
