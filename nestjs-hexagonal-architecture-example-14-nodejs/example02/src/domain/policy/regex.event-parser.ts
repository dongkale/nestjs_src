import { Events } from 'src/domain/entity/events';
import { EventParser } from 'src/domain/policy/event-parser';
import { Activity } from 'src/domain/vo/activity';
import { EventId } from 'src/domain/vo/event.id';
import { Protocol } from 'src/domain/vo/protocol';

export class RegexEventParser extends EventParser {
  parseEvent(event: string): Events {
    const regex = /(\\"[^\\"]+\\")|\S+/g; // 공백 기준으로 자르기

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_timestamp, _id, _protocol, _srcHost, _, _dstHost] = event.match(regex);

    const id = EventId.of(_id);
    const timestamp = this.parseDate(_timestamp);
    const protocol = Protocol[_protocol];
    const activity = new Activity(_srcHost, _dstHost);

    return new Events(timestamp, id, protocol, activity);
  }
}
