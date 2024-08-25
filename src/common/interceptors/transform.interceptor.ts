/* eslint-disable prettier/prettier */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';
import { RESPONSE_MESSAGE } from '../decorators/response-message.decorator';

interface Response<T> {
    statusCode: number;
    message: string;
    data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    constructor(private reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        return next.handle().pipe(
            map(data => ({
                statusCode: context.switchToHttp().getResponse().statusCode,
                message: this.reflector.get<string>(RESPONSE_MESSAGE, context.getHandler()) || '',
                data
            }))
        );
    }
}
