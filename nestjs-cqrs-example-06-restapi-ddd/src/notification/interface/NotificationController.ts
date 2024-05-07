import {
  CacheInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { FindNotificationQuery } from '../../notification/application/query/FindNotificationQuery';
import { FindNotificationResult } from '../../notification/application/query/FindNotificationResult';

import { FindAccountNotificationRequestParam } from '../../notification/interface/dto/FindAccountNotificationRequestParam';
import { FindNotificationRequestQueryString } from '../../notification/interface/dto/FindNotificationRequestQueryString';
import { FindNotificationResponseDto } from '../../notification/interface/dto/FindNotificationResponseDto';

@ApiTags('Notifications')
@Controller()
export class NotificationController {
  @Inject() private readonly queryBus: QueryBus;

  @Get('notifications')
  @ApiOkResponse({ type: FindNotificationResponseDto })
  @UseInterceptors(CacheInterceptor)
  find(
    @Query() querystring: FindNotificationRequestQueryString,
  ): Promise<FindNotificationResponseDto> {
    return this.queryBus.execute<FindNotificationQuery, FindNotificationResult>(
      new FindNotificationQuery(querystring),
    );
  }

  @Get('accounts/:accountId/notifications')
  @ApiOkResponse({ type: FindNotificationResponseDto })
  @UseInterceptors(CacheInterceptor)
  findByAccount(
    @Param() param: FindAccountNotificationRequestParam,
    @Query() querystring: FindNotificationRequestQueryString,
  ): Promise<FindNotificationResponseDto> {
    return this.queryBus.execute<FindNotificationQuery, FindNotificationResult>(
      new FindNotificationQuery({ ...param, ...querystring }),
    );
  }
}
