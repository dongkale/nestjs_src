import { RegexEventParser } from 'src/domain/policy/regex.event-parser';
import { SplitEventParser } from 'src/domain/policy/split.event-parser';
import { Activity } from 'src/domain/vo/activity';
import { EventId } from 'src/domain/vo/event.id';
import { ParsePolicyType } from 'src/domain/vo/parse.policy.type';
import { Protocol } from 'src/domain/vo/protocol';

export class Events {
  public constructor(private _timestamp: Date, private _id: EventId, private _protocol: Protocol, private _activity: Activity) {}

  toString(): string {
    return `Events{
      timestamp: ${this._timestamp}, 
      id: ${this._id.toString()},
      protocol: ${Protocol[this._protocol]},
      activity: ${this._activity.toString()}
    }`;
  }

  public static parsedEvent(unparsedEvent: string, policy: ParsePolicyType): Events {
    switch (policy) {
      case ParsePolicyType.REGEX:
        return new RegexEventParser().parseEvent(unparsedEvent);
      case ParsePolicyType.SPLIT:
        return new SplitEventParser().parseEvent(unparsedEvent);
      default:
        throw new Error('Illegal argument');
    }
  }
}
