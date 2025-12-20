import { ERpcCode, RPC_TO_HTTP_EXCEPTION_MAP } from '@shared/constants/rpc-exception-codes';
import { ServiceException } from '@shared/exceptions/service.exception';

interface IError {
  error: {
    code: ERpcCode;
    message: string;
    details: { code: ERpcCode; message: string };
  };
  message: string;
}

export const ExceptionWIthFormatRpcCode = (err: unknown): ServiceException => {
  const normalizeError: IError = err as IError;

  const payload = {
    exceptionName: RPC_TO_HTTP_EXCEPTION_MAP[normalizeError.error.code || 500].exceptionKey,
    message: normalizeError.error.message,
  };

  return ServiceException[payload.exceptionName ?? 'internal'](payload.message);
};
