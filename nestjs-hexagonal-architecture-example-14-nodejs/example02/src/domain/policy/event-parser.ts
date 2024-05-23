import { Events } from 'src/domain/entity/events';

export abstract class EventParser {
  /**
   * 현재 날짜 + rosource 파일에서 읽은 시간 값으로 parsing
   * */
  protected parseDate(time: string): Date {
    const now = new Date();
    const result = new Date(`${now.getUTCFullYear()}-${now.getUTCMonth() + 1}-${now.getUTCDate()} ${time}`);
    return result;
  }

  abstract parseEvent(event: string): Events;
}
