import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (
          data &&
          typeof data === 'object' &&
          Object.prototype.hasOwnProperty.call(data, 'result')
        ) {
          return data;
        }

        return { result: data };
      }),
    );
  }
}
