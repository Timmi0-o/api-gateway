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
  errors?: Record<string, string[]>;
}

interface IRpcError {
  error?: {
    error?: IInnerError;
    grpcStatus?: number;
    errorCode?: number;
    message?: string;
    errors?: Record<string, string[]>;
    timestamp?: string;
  };
  message?: string;
  errors?: Record<string, string[]>;
}

const isValidationMessage = (msg: string): boolean =>
  /validation/i.test(msg) || msg === 'Validation failed';

export const ExceptionWIthFormatRpcCode = (err: unknown): ServiceException => {
  if (err instanceof ServiceException) {
    return err;
  }

  try {
    const error = err as IRpcError;

    const grpcStatus =
      error.error?.error?.grpcStatus ?? error.error?.grpcStatus ?? ERpcCode.INTERNAL;

    const message =
      error.error?.error?.message ??
      error.error?.message ??
      (typeof error.message === 'string' ? error.message : null) ??
      'Внутренняя ошибка сервера';

    const errors = error.error?.error?.errors ?? error.error?.errors ?? error.errors;

    const validationErrors: Record<string, string[]> | undefined =
      errors &&
      typeof errors === 'object' &&
      !Array.isArray(errors) &&
      Object.values(errors).every(
        (v): v is string[] => Array.isArray(v) && v.every((s) => typeof s === 'string'),
      )
        ? errors
        : undefined;

    let exceptionMapping = RPC_TO_HTTP_EXCEPTION_MAP[grpcStatus as ERpcCode];
    if (grpcStatus === ERpcCode.INTERNAL && isValidationMessage(message)) {
      exceptionMapping = RPC_TO_HTTP_EXCEPTION_MAP[ERpcCode.INVALID_ARGUMENT];
    }
    exceptionMapping ??= { code: 500, exceptionKey: 'internal' };

    const exceptionKey = exceptionMapping.exceptionKey;
    if (exceptionKey === RPC_TO_HTTP_EXCEPTION_MAP[ERpcCode.INVALID_ARGUMENT].exceptionKey) {
      return ServiceException.validation(validationErrors ?? message, message);
    }

    const exceptionMethod = ServiceException[exceptionKey as keyof typeof ServiceException];

    if (typeof exceptionMethod === 'function') {
      return (exceptionMethod as (msg: string) => ServiceException)(message);
    }
    return ServiceException.internal(message);
  } catch {
    return ServiceException.internal('Ошибка при обработке ошибки микросервиса');
  }
};
