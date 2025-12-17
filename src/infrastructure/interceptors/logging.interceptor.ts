import { ILoggerService, ILoggerSymbol } from '@domain/services/i-logger.service';
import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(@Inject(ILoggerSymbol) private logger: ILoggerService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const { method, url, query, params } = request;
    const userAgent = request.get('user-agent') || '';
    const start = Date.now();

    this.logger.debug(
      `→ ${method} ${url}`,
      JSON.stringify({
        query,
        params,
        userAgent,
      }),
      'LoggingInterceptor',
    );

    return next.handle().pipe(
      tap(
        (data) => {
          const duration = Date.now() - start;
          const statusCode = response.statusCode;

          this.logger.debug(
            `← ${method} ${url} [${statusCode}] ${duration}ms`,
            JSON.stringify({
              statusCode,
              duration,
            }),
            'LoggingInterceptor',
          );
        },
        (error) => {
          const duration = Date.now() - start;
          const statusCode = error.status || 500;

          this.logger.error(
            `✗ ${method} ${url} [${statusCode}] ${duration}ms`,
            JSON.stringify({
              statusCode,
              duration,
              error: error.message,
            }),
            'LoggingInterceptor',
          );
        },
      ),
    );
  }
}
