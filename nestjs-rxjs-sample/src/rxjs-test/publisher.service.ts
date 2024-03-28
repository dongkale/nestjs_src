import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class PublisherService {
  private readonly events = new Subject<string>();

  publishEvent(event: string) {
    this.events.next(event);
  }

  getEvents(): Observable<string> {
    return this.events.asObservable();
  }
}
