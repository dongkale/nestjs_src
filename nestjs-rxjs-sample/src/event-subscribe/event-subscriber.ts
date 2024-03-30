import { Injectable } from '@nestjs/common';
import { /* BehaviorSubject, Observable, */ Subject } from 'rxjs';

type CallbackEventSubscribe = (
  num: number,
  event: string,
  data: any,
  argument: any,
) => boolean;

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

  private eventSubjects = {};
  // private eventSubjectsByDelete = {};

  constructor() {
    // this.eventSubjects['delete'] = new Subject<{
    //   name: string;
    //   argument: any;
    // }>()
    //   .asObservable()
    //   .subscribe({
    //     next: (event) => this.__cb_delete__(event.name, null, event.argument),
    //     error: (err) => this.__cb_error__(err),
    //   });
  }

  @AttachdedException()
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
    //     next: (event) => {
    //       const result = func(event.name, data, event.argument);
    //       console.log(`[EventSubscriber] ${name} result: ${result}`);
    //     },
    //     error: (err) => this.__error__(err),
    //   });

    // this.eventSubjects[name] = new Subject<{ name: string; argument: any }>()
    //   .asObservable()
    //   .subscribe({
    //     next: (event) =>
    //       this.__cb_function__(func, event.name, data, event.argument),
    //     error: (err) => this.__cb_error__(name, err),
    //     complete: () => this.__cb_complete__(name),
    //   });

    this.eventSubjects[name] = new Subject<{
      name: string;
      argument: any;
    }>();

    // if (maxNum <= 0) {
    // } else {
    //   maxNum = 1;
    // }

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

    // this.eventSubjects[name].asObservable().subscribe({
    //   next: (event) =>
    //     this.__cb_function__(func, event.name, data, event.argument),
    //   error: (err) => this.__cb_error__(name, err),
    //   complete: () => this.__cb_complete__(name),
    // });

    return true;
  }

  publishEvent(name: string, argument: any): boolean {
    if (!this.eventSubjects.hasOwnProperty(name)) {
      console.log(`[EventSubscriber] not exists: ${name}`);
      return false;
    }

    this.eventSubjects[name].next({ name: name, argument: argument });

    // this.eventSubjects[name].error('error');
    // this.eventSubjects[name].complete('cpomplete');

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

    // complete
    // if (num == maxNum) {
    // userFn(-1, name, data, argument);
    // }

    if (maxNum > 0 && num >= maxNum) {
      this.deleteEvent(name);
      console.log(`[EventSubscriber] delete event: ${name}`);
    }

    return true;
  }

  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // private __cb_delete__(event: string, _data: any, argument: any): any {
  //   this.deleteEvent(argument);

  //   console.log(`[EventSubscriber] delete event: ${argument}`);
  // }

  private __cb_error__(name: string, err: Error) {
    console.log(`[EventSubscriber][Error] event: ${name} -> ${err.message}`);
  }

  private __cb_complete__(name: string) {
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
