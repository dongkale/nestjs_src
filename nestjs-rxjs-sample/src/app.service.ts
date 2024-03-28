import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AppService {
  //#1. rxjs 형식
  private rxjsFactory: BehaviorSubject<any> = new BehaviorSubject([]); //발행기관

  private readonly rxjsObserve: Observable<any> =
    this.rxjsFactory.asObservable(); // 발행 기관에서 구독기관 만들기

  //데이터 발행하기
  public addDataRxjs(info?: any): void {
    // this.rxjsFactory.next([...this.rxjsFactory.value, info]);
    console.log('this.rxjsFactory.value : ', this.rxjsFactory.value);
    this.rxjsFactory.next(info);
  }

  public subscribeDataRxjs(fn?: any): void {
    this.rxjsObserve.subscribe(fn);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
