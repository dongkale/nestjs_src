import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class EventSubscribeHandlerEx {
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

  addedEvent(event: string, data: any, func: any): boolean {
    if (this.eventSubjects.hasOwnProperty(event)) {
      return false;
    }

    this.eventSubjects[event] = new Subject<{ name: string; argument: any }>()
      .asObservable()
      .subscribe({
        next: (event) => func(event.name, event.argument, data),
        error: (err) => this.__error__(err),
      });
      
    return true;
  }

  publishEvent(name: string, data: any): boolean {
    if (!this.eventSubjects.hasOwnProperty(name)) {
      return false;
    }

    this.eventSubjects[name].next({ name: name, data: data });

    return true;
  }

  __error__(err: string) {
    console.log(err);
  }
}
