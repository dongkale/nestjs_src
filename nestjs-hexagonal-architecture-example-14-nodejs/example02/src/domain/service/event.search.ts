import { Events } from 'src/domain/entity/events';
import { ParsePolicyType } from 'src/domain/vo/parse.policy.type';

export class EventSearch {
  public retrieveEvents(unparseEvents: string[], policyType: ParsePolicyType): Events[] {
    return unparseEvents.map((e) => Events.parsedEvent(e, policyType));
  }
}
