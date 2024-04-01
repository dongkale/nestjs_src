import { Injectable } from '@nestjs/common';
import { Subject, Subscription } from 'rxjs';

type CallbackEventSubscribe = (
  num: number,
  event: string,
  data: any,
  argument: any,
) => boolean;

interface EventSubscription {
  subscription: Subscription;
  maxNum: number;
}

@Injectable()
export class EventSubscriber {
  private eventSubjects: Record<
    string,
    Subject<{ name: string; argument: any }>
  > = {};
  private eventSubscriptions: Record<string, EventSubscription[]> = {};

  constructor() {}

  subscribeEvent(
    name: string,
    data: any,
    maxNum: number,
    func: CallbackEventSubscribe,
  ): boolean {
    if (this.eventSubjects.hasOwnProperty(name)) {
      console.log(`[EventSubscriber] already exists: ${name}`);
      return false;
    }

    const eventSubject = new Subject<{ name: string; argument: any }>();
    this.eventSubjects[name] = eventSubject;
    this.eventSubscriptions[name] = [];

    const makeCount = maxNum > 0 ? maxNum : 1;
    for (let i = 0; i < makeCount; i++) {
      const num = i + 1;
      const subscription = eventSubject.asObservable().subscribe({
        next: (event) =>
          this.handleEvent(num, maxNum, event.name, data, func, event.argument),
        error: (err) => this.handleEventError(name, err),
        complete: () => this.handleEventComplete(name),
      });
      this.eventSubscriptions[name].push({ subscription, maxNum });
    }

    return true;
  }

  publishEvent(name: string, argument: any): boolean {
    if (!this.eventSubjects.hasOwnProperty(name)) {
      console.log(`[EventSubscriber] not exists: ${name}`);
      return false;
    }

    this.eventSubjects[name].next({ name, argument });

    return true;
  }

  deleteEvent(name: string): boolean {
    if (!this.eventSubjects.hasOwnProperty(name)) {
      return false;
    }

    const subscriptions = this.eventSubscriptions[name];
    subscriptions.forEach(({ subscription }) => {
      subscription.unsubscribe();
    });

    delete this.eventSubjects[name];
    delete this.eventSubscriptions[name];

    return true;
  }

  private handleEvent(
    num: number,
    maxNum: number,
    name: string,
    data: any,
    userFn: CallbackEventSubscribe,
    argument: any,
  ): void {
    if (typeof userFn !== 'function') {
      console.log(`[EventSubscriber] not user function: ${name}`);
      return;
    }

    if (!userFn(num, name, data, argument) || (maxNum > 0 && num >= maxNum)) {
      this.deleteEvent(name);
      console.log(`[EventSubscriber] delete event: ${name}`);
    }
  }

  private handleEventError(name: string, err: Error): void {
    console.log(`[EventSubscriber][Error] event: ${name} -> ${err.message}`);
  }

  private handleEventComplete(name: string): void {
    console.log(`[EventSubscriber] complete event: ${name}`);
  }
}
