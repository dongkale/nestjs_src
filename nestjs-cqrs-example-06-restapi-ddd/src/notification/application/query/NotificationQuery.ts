import { FindNotificationQuery } from '../../../notification/application/query/FindNotificationQuery';
import { FindNotificationResult } from '../../../notification/application/query/FindNotificationResult';

export interface NotificationQuery {
  find: (options: FindNotificationQuery) => Promise<FindNotificationResult>;
}
