import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { EmailAdaptorImplement } from '@/notification/infrastructure/adaptor/EmailAdaptorImplement';
import { NotificationRepositoryImplement } from '@/notification/infrastructure/repository/NotificationRepositoryImplement';
import { NotificationQueryImplement } from '@/notification/infrastructure/query/NotificationQueryImplement';

import { NotificationIntegrationController } from '@/notification/interface/NotificationIntegrationController';
import { NotificationController } from '@/notification/interface/NotificationController';

import { SendEmailHandler } from '@/notification/application/command/SendEmailHandler';
import { InjectionToken } from '@/notification/application/InjectionToken';
import { FindNotificationHandler } from '@/notification/application/query/FindNotificationHandler';

import { NotificationFactory } from '@/notification/domain/NotificationFactory';

const infrastructure = [
  {
    provide: InjectionToken.EMAIL_ADAPTOR,
    useClass: EmailAdaptorImplement,
  },
  {
    provide: InjectionToken.NOTIFICATION_REPOSITORY,
    useClass: NotificationRepositoryImplement,
  },
  {
    provide: InjectionToken.NOTIFICATION_QUERY,
    useClass: NotificationQueryImplement,
  },
];

const application = [SendEmailHandler, FindNotificationHandler];

const domain = [NotificationFactory];

@Module({
  imports: [CqrsModule],
  providers: [...infrastructure, ...application, ...domain],
  controllers: [NotificationIntegrationController, NotificationController],
})
export class NotificationModule {}
