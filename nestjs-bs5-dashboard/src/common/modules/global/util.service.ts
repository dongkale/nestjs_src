import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {
  /**
   * Set global requestId
   */
  public setRequestId(requestId: string) {
    global.requestId = requestId;
  }

  /**
   * Get global requestId
   */
  public getRequestId(): string {
    return global.requestId;
  }

  /**
   * Get pagination
   * offset with given page
   */
  public getSkipOffset(params: { limit: number; page: number }) {
    const { page, limit } = params;
    return (page > 0 ? page - 1 : 0) * limit;
  }
}
