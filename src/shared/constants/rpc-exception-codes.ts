/**
 * gRPC Error Codes (standard)
 * Официальные коды из gRPC спецификации
 * @see https://grpc.io/docs/guides/error/
 *
 * OK (0):                 Успех (для ответов)
 * CANCELLED (1):          Операция отменена
 * UNKNOWN (2):            Неизвестная ошибка
 * INVALID_ARGUMENT (3):   Валидация, неверные аргументы
 * DEADLINE_EXCEEDED (4):  Timeout
 * NOT_FOUND (5):          Сущность не найдена
 * ALREADY_EXISTS (6):     Сущность уже существует
 * PERMISSION_DENIED (7):  Нет прав (Forbidden)
 * RESOURCE_EXHAUSTED (8): Лимит исчерпан
 * FAILED_PRECONDITION (9):Условие не выполнено
 * ABORTED (10):           Операция отменена (конфликт)
 * OUT_OF_RANGE (11):      Значение вне диапазона
 * UNIMPLEMENTED (12):     Не реализовано
 * INTERNAL (13):          Внутренняя ошибка сервера
 * UNAVAILABLE (14):       Сервис недоступен
 * DATA_LOSS (15):         Потеря данных
 * UNAUTHENTICATED (16):   Не аутентифицирован (Unauthorized)
 */
export enum ERpcCode {
  OK = 0,
  CANCELLED = 1,
  UNKNOWN = 2,
  INVALID_ARGUMENT = 3,
  DEADLINE_EXCEEDED = 4,
  NOT_FOUND = 5,
  ALREADY_EXISTS = 6,
  PERMISSION_DENIED = 7,
  RESOURCE_EXHAUSTED = 8,
  FAILED_PRECONDITION = 9,
  ABORTED = 10,
  OUT_OF_RANGE = 11,
  UNIMPLEMENTED = 12,
  INTERNAL = 13,
  UNAVAILABLE = 14,
  DATA_LOSS = 15,
  UNAUTHENTICATED = 16,
}

/**
 * Соответствие кодов gRPC ошибка ↔ HTTP статус код
 */
export interface IRpcHttpExceptionMap {
  code: number;
  exceptionKey: string;
}

/**
 * Соответствие кодов gRPC ошибка ↔ HTTP статус код + ключ исключения,
 */
export const RPC_TO_HTTP_EXCEPTION_MAP: Record<ERpcCode, IRpcHttpExceptionMap> = {
  [ERpcCode.OK]: { code: 200, exceptionKey: 'ok' },
  [ERpcCode.CANCELLED]: { code: 499, exceptionKey: 'cancelled' }, // Not direct mapping, not in ServiceException
  [ERpcCode.UNKNOWN]: { code: 500, exceptionKey: 'internal' },
  [ERpcCode.INVALID_ARGUMENT]: { code: 400, exceptionKey: 'validation' },
  [ERpcCode.DEADLINE_EXCEEDED]: { code: 504, exceptionKey: 'timeout' },
  [ERpcCode.NOT_FOUND]: { code: 404, exceptionKey: 'entityNotFound' },
  [ERpcCode.ALREADY_EXISTS]: { code: 409, exceptionKey: 'userAlreadyExists' },
  [ERpcCode.PERMISSION_DENIED]: { code: 403, exceptionKey: 'forbidden' },
  [ERpcCode.RESOURCE_EXHAUSTED]: { code: 429, exceptionKey: 'rateLimitExceeded' },
  [ERpcCode.FAILED_PRECONDITION]: { code: 400, exceptionKey: 'operationNotAllowed' },
  [ERpcCode.ABORTED]: { code: 409, exceptionKey: 'conflict' },
  [ERpcCode.OUT_OF_RANGE]: { code: 400, exceptionKey: 'validation' },
  [ERpcCode.UNIMPLEMENTED]: { code: 501, exceptionKey: 'unimplemented' }, // Not in ServiceException, fallback
  [ERpcCode.INTERNAL]: { code: 500, exceptionKey: 'internal' },
  [ERpcCode.UNAVAILABLE]: { code: 503, exceptionKey: 'serviceUnavailable' },
  [ERpcCode.DATA_LOSS]: { code: 500, exceptionKey: 'internal' }, // no direct mapping
  [ERpcCode.UNAUTHENTICATED]: { code: 401, exceptionKey: 'unauthorized' },
};
