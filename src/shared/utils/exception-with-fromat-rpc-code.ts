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

    const exceptionMethod =
      ServiceException[exceptionMapping.exceptionKey as keyof typeof ServiceException];

    if (typeof exceptionMethod === 'function') {
      return (exceptionMethod as (msg: string) => ServiceException)(message);
    }
    return ServiceException.internal(message);
  } catch {
    return ServiceException.internal('Ошибка при обработке ошибки микросервиса');
  }
};
