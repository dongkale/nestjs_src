import { Injectable } from '@nestjs/common';
import { /* BehaviorSubject, Observable, */ Subject, Subscription } from 'rxjs';

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
  /*
  // private rxjsFactory: BehaviorSubject<any> = new BehaviorSubject([]);

  private eventSubjects = {};

  addedEvent(event: string, func: any): boolean {
    if (this.eventSubjects.hasOwnProperty(event)) {
      return false;
    }

    // const rxjsFactory: BehaviorSubject<any> = new BehaviorSubject([]);

    this.eventSubjects[event] = new BehaviorSubject([])
      .asObservable()
      .subscribe((arg) => func(event, arg));

    // this.eventSubjects[event] = rxjsFactory.asObservable();
    // this.eventSubjects[event];

    return true;
  }

  deleteEvent(event: string): boolean {
    if (!this.eventSubjects.hasOwnProperty(event)) {
      return false;
    }

    delete this.eventSubjects[event];

    return true;
  }

  publishEvent(event: string, data: any): boolean {
    if (!this.eventSubjects.hasOwnProperty(event)) {
      return false;
    }

    this.eventSubjects[event].next(data);

    return true;
  }
  */

  // private eventSubjects = {};
  // private eventSubjectsByDelete = {};
  private eventSubjects: Record<
    string,
    Subject<{ name: string; argument: any }>
  > = {};
  private eventSubscriptions: Record<string, EventSubscription[]> = {};

  constructor() {}

  //@AttachdedException()
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

    // this.eventSubjects[name] = new Subject<{ name: string; argument: any }>()
    //   .asObservable()
    //   .subscribe({
    //     next: (event) =>
    //       this.__cb_function__(func, event.name, data, event.argument),
    //     error: (err) => this.__cb_error__(name, err),
    //     complete: () => this.__cb_complete__(name),
    //   });

    // this.eventSubjects[name] = new Subject<{
    //   name: string;
    //   argument: any;
    // }>();

    // const makeCount = maxNum > 0 ? maxNum : 1;
    // for (let i = 0; i < makeCount; i++) {
    //   const num = i + 1;
    //   this.eventSubjects[name].asObservable().subscribe({
    //     next: (event) =>
    //       this.__cb_function__(
    //         num,
    //         maxNum,
    //         event.name,
    //         data,
    //         func,
    //         event.argument,
    //       ),
    //     error: (err) => this.__cb_error__(name, err),
    //     complete: () => this.__cb_complete__(name),
    //   });
    // }

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

    // this.eventSubjects[name].unsubscribe();
    // delete this.eventSubjects[name];

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
  ): boolean {
    if (typeof userFn !== 'function') {
      console.log(`[EventSubscriber] not user function: ${name}`);
      return false;
    }

    // if (!userFn(num, name, data, argument)) {
    //   this.deleteEvent(name);
    //   console.log(`[EventSubscriber] delete event: ${name}`);
    // }

    // if (maxNum > 0 && num >= maxNum) {
    //   this.deleteEvent(name);
    //   console.log(`[EventSubscriber] delete event: ${name}`);
    // }

    if (!userFn(num, name, data, argument) || (maxNum > 0 && num >= maxNum)) {
      this.deleteEvent(name);
      console.log(`[EventSubscriber] delete event: ${name}`);
    }

    return true;
  }

  private handleEventError(name: string, err: Error): void {
    console.log(`[EventSubscriber][Error] event: ${name} -> ${err.message}`);
  }

  private handleEventComplete(name: string): void {
    console.log(`[EventSubscriber] complete event: ${name}`);
  }
}

function AttachdedException(object) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const method = descriptor.value;

    descriptor.value = function () {
      try {
        method();
      } catch (e) {
        console.log(e);
      }
    };
  };
}
