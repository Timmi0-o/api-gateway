import { ILoggerService, ILoggerSymbol } from '@domain/services/i-logger.service';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(@Inject(ILoggerSymbol) private logger: ILoggerService) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let details: any = exception;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      message = (exceptionResponse as any).message || exception.message;
      details = exceptionResponse;
    } else if (exception instanceof Error) {
      message = exception.message;
      details = {
        name: exception.name,
        message: exception.message,
        stack: exception.stack,
      };
    }

    const errorResponse = {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    };

    // Логируем ошибку
    this.logger.error(
      `${request.method} (${request.url}) | ${status}: ${message}`,
      JSON.stringify(details),
      'GlobalExceptionFilter',
    );

    response.status(status).json(errorResponse);
  }
}
