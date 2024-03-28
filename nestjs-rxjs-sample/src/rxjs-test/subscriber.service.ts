import { Injectable } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class SubscriberService {
  constructor(private readonly publisherService: PublisherService) {}

  subscribeToEvent(eventType: string): Observable<string> {
    return this.publisherService
      .getEvents()
      .pipe(filter((event) => event === eventType));
  }
}
