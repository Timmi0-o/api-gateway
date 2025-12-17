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
