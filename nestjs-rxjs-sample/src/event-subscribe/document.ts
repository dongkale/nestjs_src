
import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

type CallbackEventSubscribe = (
  num: number,
  event: string,
  data: any,
  argument: any,
) => boolean;

@Injectable()
export class EventSubscriber {
  private eventSubjects = {};

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

    this.eventSubjects[name] = new Subject<{
      name: string;
      argument: any;
    }>();

    const makeCount = maxNum > 0 ? maxNum : 1;
    for (let i = 0; i < makeCount; i++) {
      const num = i + 1;
      this.eventSubjects[name].asObservable().subscribe({
        next: (event) =>
          this.__cb_function__(
            num,
            maxNum,
            event.name,
            data,
            func,
            event.argument,
          ),
        error: (err) => this.__cb_error__(name, err),
        complete: () => this.__cb_complete__(name),
      });
    }

    return true;
  }

  publishEvent(name: string, argument: any): boolean {
    if (!this.eventSubjects.hasOwnProperty(name)) {
      console.log(`[EventSubscriber] not exists: ${name}`);
      return false;
    }

    this.eventSubjects[name].next({ name: name, argument: argument });

    return true;
  }

  deleteEvent(name: string): boolean {
    if (!this.eventSubjects.hasOwnProperty(name)) {
      return false;
    }

    this.eventSubjects[name].unsubscribe();

    delete this.eventSubjects[name];

    return true;
  }

  private __cb_function__(
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

    if (!userFn(num, name, data, argument)) {
      this.deleteEvent(name);
      console.log(`[EventSubscriber] delete event: ${name}`);
    }

    if (maxNum > 0 && num >= maxNum) {
      this.deleteEvent(name);
      console.log(`[EventSubscriber] delete event: ${name}`);
    }

    return true;
  }

  private __cb_error__(name: string, err: Error) {
    console.log(`[EventSubscriber][Error] event: ${name} -> ${err.message}`);
  }

  private __cb_complete__(name: string) {
    console.log(`[EventSubscriber] complete event: ${name}`);
  }
}
