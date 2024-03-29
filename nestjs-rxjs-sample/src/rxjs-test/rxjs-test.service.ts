import { Injectable } from '@nestjs/common';
import { Observable, Subject, filter, ReplaySubject } from 'rxjs';

@Injectable()
export class RxjsTestService {
  private readonly subject1 = new Subject<string>();
  private readonly subject2 = new Subject<string>();
  private readonly subject3 = new Subject<string>();

  private readonly eventsSubject = new ReplaySubject<{
    eventType: string;
    eventData: any;
  }>();

  private eventSubjects = {};

  publishMessage(eventType: string, data: any) {
    switch (eventType) {
      case 'event1':
        this.subject1.next(data);
        break;
      case 'event2':
        this.subject2.next(data);
        break;
      case 'event3':
        this.subject3.next(data);
        break;
    }
  }

  addedSubscribe(eventType: string, fn: any) {
    switch (eventType) {
      case 'event1':
        this.subject1.asObservable().subscribe(fn);
        break;
      case 'event2':
        this.subject2.asObservable().subscribe(fn);
        break;
      case 'event3':
        this.subject3.asObservable().subscribe(fn);
        break;
    }
  }

  publishMessageEx(eventType: string, data: any) {
    this.eventsSubject.next({ eventType: eventType, eventData: data });
  }

  addedSubscribeEx(eventType: string, fn: any) {
    this.eventsSubject.asObservable().subscribe((event) => {
      if (event.eventType === eventType) {
        fn(event.eventData);
      }
    });
    // switch (eventType) {
    //   case 'event1':
    //     this.subject1.asObservable().subscribe(fn);
    //     break;
    //   case 'event2':
    //     this.subject2.asObservable().subscribe(fn);
    //     break;
    //   case 'event3':
    //     this.subject3.asObservable().subscribe(fn);
    //     break;
    // }
  }

  addedEventSubscribe(event: string, fn: any) {
    // const obj = new Subject<string>();
    //   obj.asObservable().subscribe(fn);
    // this.eventsSubject[eventType] = {}.asObservable().subscribe(fn);

    if (this.eventSubjects.hasOwnProperty(event)) {
      return false;
    }

    // this.eventSubjects[eventType] = new Subject<string>()
    //   .asObservable()
    //   .subscribe(fn);

    this.eventSubjects[event] = new Subject<string>()
      .asObservable()
      .subscribe((arg) => fn(event, arg));

    return true;
  }

  deleteEventSubscribe(event: string) {
    if (!this.eventSubjects.hasOwnProperty(event)) {
      return false;
    }

    delete this.eventSubjects[event];

    return true;
  }

  publishEventSubscribe(event: string, data: any): boolean {
    if (!this.eventSubjects.hasOwnProperty(event)) {
      return false;
    }

    this.eventSubjects[event].next(data);

    return true;
  }

  getHello(): string {
    return 'Hello!(Service)';
  }

  getWorld(): string {
    return 'World!(Service) ';
  }

  getFuntion(inData: string): string {
    return `Input: ${inData} - (Service)`;
  }

  //   subscribeToMessages(): Observable<string> {
  //     return this.publisherService.getMessage();
  //   }

  //   getMessage(): Observable<string> {
  //     return this.subject.asObservable();
  //   }
}
