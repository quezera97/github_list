import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
  
@Injectable()
export class ModifyUsernameInterceptor implements NestInterceptor {
intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // Modify the username in the request body
    if (request.body && request.body.username) {
        request.body.username = `prefix_${request.body.username}_suffix`;
    }

    return next.handle().pipe(
        map((data) => {
            return data;
        }),
    );
}
}
  