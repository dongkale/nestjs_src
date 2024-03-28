import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { SALES_LIST } from './sales';

@Injectable()
export class ProductsClient {
  getSales(): Observable<AxiosResponse<any[]>> {
    const source = of({
      data: SALES_LIST,
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {},
    });

    return source.pipe(delay(150));
  }
}
