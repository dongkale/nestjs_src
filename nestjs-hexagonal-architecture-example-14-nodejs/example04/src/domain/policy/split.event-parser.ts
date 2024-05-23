/* eslint-disable @typescript-eslint/no-unused-vars */

import { Events } from 'src/domain/entity/events';
import { EventParser } from 'src/domain/policy/event-parser';
import { Activity } from 'src/domain/vo/activity';
import { EventId } from 'src/domain/vo/event.id';
import { Protocol } from 'src/domain/vo/protocol';

export class SplitEventParser extends EventParser {
  parseEvent(event: string): Events {
    const SEPARATOR = '' as const;
    const [_timestamp, _id, _protocol, _srcHost, _, _dstHost] = event.split(SEPARATOR);

    const id = EventId.of(_id);
    const timestamp = this.parseDate(_timestamp);
    const protocol = Protocol[_protocol];
    const activity = new Activity(_srcHost, _dstHost);

    return new Events(timestamp, id, protocol, activity);
  }
}
