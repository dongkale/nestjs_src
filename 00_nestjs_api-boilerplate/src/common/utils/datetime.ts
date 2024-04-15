import dayjs from 'dayjs';

const DEFAULT_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export class DateTime {
  private datetime = dayjs();

  constructor(date?: string) {
    this.datetime = dayjs(date);
  }

  get year(): number {
    return this.datetime.year();
  }

  get month(): number {
    return this.datetime.month();
  }

  get day(): number {
    return this.datetime.day();
  }

  get hour(): number {
    return this.datetime.hour();
  }

  get minute(): number {
    return this.datetime.minute();
  }

  get second(): number {
    return this.datetime.second();
  }

  get timestamp(): number {
    return this.datetime.unix();
  }

  format(template: string): string {
    return this.datetime.format(template);
  }

  toDate(): Date {
    return this.datetime.toDate();
  }

  toString(): string {
    return this.format(DEFAULT_DATETIME_FORMAT);
  }

  toSQLString(): string {
    return this.format(DEFAULT_DATETIME_FORMAT);
  }

  static now(): DateTime {
    return new DateTime();
  }
}
