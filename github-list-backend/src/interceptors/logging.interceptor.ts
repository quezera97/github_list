import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// inteceptor only can be used when http request is involved
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger('LoggingInterceptor');

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const method = request.method;
        const url = request.url;
        const now = Date.now();

        return next.handle().pipe(
            tap(() => {
                this.logger.log(`METHOD: ${method}, URL: ${url}, TIME: ${Date.now() - now}ms ago`);
            })
        );
    }
}
