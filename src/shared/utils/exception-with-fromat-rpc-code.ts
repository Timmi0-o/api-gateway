import { ERpcCode, RPC_TO_HTTP_EXCEPTION_MAP } from '@shared/constants/rpc-exception-codes';
import { ServiceException } from '@shared/exceptions/service.exception';

interface IInnerError {
  name: string;
  message: string;
  errorCode: string;
  grpcStatus: number;
  severity: string;
  category: string;
  timestamp: string;
  isOperational: boolean;
  isRetriable: boolean;
  metadata: Record<string, unknown>;
  serviceName: string;
  httpStatus: number;
  context?: Record<string, unknown>;
}

interface IRpcError {
  error?: {
    error?: IInnerError;
    grpcStatus?: number;
    errorCode?: string;
    message?: string;
    timestamp?: string;
  };
  message?: string;
}

export const ExceptionWIthFormatRpcCode = (err: unknown): ServiceException => {
  try {
    const error = err as IRpcError;

    // Получаем grpcStatus из структуры ошибки
    const grpcStatus =
      error.error?.error?.grpcStatus || error.error?.grpcStatus || ERpcCode.INTERNAL;

    // Получаем сообщение ошибки
    const message =
      error.error?.error?.message ||
      error.error?.message ||
      error.message ||
      'Внутренняя ошибка сервера';

    // Получаем ключ исключения из кэша
    const exceptionMapping = RPC_TO_HTTP_EXCEPTION_MAP[grpcStatus] || {
      code: 500,
      exceptionKey: 'internal',
    };

    console.log('exceptionMapping', exceptionMapping);
    console.log('message', message);

    return ServiceException[exceptionMapping.exceptionKey ?? 'internal'](message);
  } catch (innerErr) {
    console.log('innerErr', innerErr);
    return ServiceException.internal('Ошибка при обработке ошибки микросервиса');
  }
};
