import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AppService {
  private FACTORY: BehaviorSubject<any> = new BehaviorSubject([]);
  public readonly TV: Observable<any> = this.FACTORY.asObservable();

  public addDataRxjs(info?: any): void {
    this.FACTORY.next([...this.FACTORY.value, info]);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
