import { Module, Scope } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalExceptionFilter, NotFoundExceptionFilter, UniqueConstraintExceptionFilter, ValidationExceptionFilter } from '@/web-api/commons/filters';
import { I18nModule } from './i18n.module';
import { StopwatchInterceptor, ResponseTransformerInterceptor } from '../interceptors';

@Module({
    imports: [I18nModule],
    exports: [I18nModule],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            scope: Scope.REQUEST,
            useClass: GlobalExceptionFilter,
        },
        {
            provide: APP_FILTER,
            scope: Scope.REQUEST,
            useClass: UniqueConstraintExceptionFilter,
        },
        {
            provide: APP_FILTER,
            scope: Scope.REQUEST,
            useClass: NotFoundExceptionFilter,
        },
        {
            provide: APP_FILTER,
            scope: Scope.REQUEST,
            useClass: ValidationExceptionFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            scope: Scope.REQUEST,
            useClass: StopwatchInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            scope: Scope.REQUEST,
            useClass: ResponseTransformerInterceptor,
        },
    ],
})

export class WebModule { }
