import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class EventSubscribeHandler {
  private eventSubjects = {};

  private eventSubjects2 = {};

  @deco('TEST')
  addedEvent(event: string, data: any, func: any): boolean {
    if (this.eventSubjects.hasOwnProperty(event)) {
      return false;
    }

    this.eventSubjects[event] = new Subject<string>()
      .asObservable()
      .subscribe((argument) => func(event, data, argument));

    return true;
  }

  deleteEvent(event: string): boolean {
    if (!this.eventSubjects.hasOwnProperty(event)) {
      return false;
    }

    this.eventSubjects[event].unsubscribe();

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
}

function deco(event: string) {
  console.log('데코레이터가 평가됨 ' + event);

  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    console.log(target);
    console.log(propertyKey);
    console.log(descriptor);
  };
}

// function HandleError(event: string, data: any, argument) {
//   return function (
//     target: any,
//     propertyKey: string,
//     descriptor: PropertyDescriptor,
//   ) {
//     console.log(target);
//     console.log(propertyKey);
//     console.log(descriptor);

//     const method = descriptor.value;

//     // descriptor.value = function () {
//     //   try {
//     //     method();
//     //   } catch (e) {
//     //     // 에러 핸들링 로직 구현
//     //     console.log(e);
//     //   }
//     // };
//   };
// }
