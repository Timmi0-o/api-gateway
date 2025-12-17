import { HttpException, HttpStatus } from '@nestjs/common';

export interface IHttpErrorPayload {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Единственный класс исключений для приложения.
 * Наследует HttpException — NestJS обрабатывает его автоматически.
 * Отправляет HTTP статус код в ответе.
 */
export class ServiceException extends HttpException {
  constructor(message: string, statusCode: HttpStatus, errors?: Record<string, string[]>) {
    const payload: IHttpErrorPayload = {
      statusCode,
      message,
    };

    if (errors !== undefined) {
      payload.errors = errors;
    }

    super(payload, statusCode);
  }

  // ─────────────────────────────────────────────────────────────
  // Authentication / Authorization (UNAUTHENTICATED, PERMISSION_DENIED)
  // ─────────────────────────────────────────────────────────────

  static userNotFound(message = 'User not found'): ServiceException {
    return new ServiceException(message, HttpStatus.NOT_FOUND);
  }

  static invalidCredentials(message = 'Invalid credentials'): ServiceException {
    return new ServiceException(message, HttpStatus.UNAUTHORIZED);
  }

  static userAlreadyExists(message = 'User already exists'): ServiceException {
    return new ServiceException(message, HttpStatus.CONFLICT);
  }

  static tokenExpired(message = 'Token expired'): ServiceException {
    return new ServiceException(message, HttpStatus.UNAUTHORIZED);
  }

  static invalidToken(message = 'Invalid token'): ServiceException {
    return new ServiceException(message, HttpStatus.UNAUTHORIZED);
  }

  static refreshTokenExpired(message = 'Refresh token expired'): ServiceException {
    return new ServiceException(message, HttpStatus.UNAUTHORIZED);
  }

  static refreshTokenRevoked(message = 'Refresh token revoked'): ServiceException {
    return new ServiceException(message, HttpStatus.UNAUTHORIZED);
  }

  static sessionNotFound(message = 'Session not found'): ServiceException {
    return new ServiceException(message, HttpStatus.NOT_FOUND);
  }

  static unauthorized(message = 'Unauthorized'): ServiceException {
    return new ServiceException(message, HttpStatus.UNAUTHORIZED);
  }

  static forbidden(message = 'Forbidden'): ServiceException {
    return new ServiceException(message, HttpStatus.FORBIDDEN);
  }

  static accountLocked(message = 'Account locked'): ServiceException {
    return new ServiceException(message, HttpStatus.FORBIDDEN);
  }

  static accountNotActivated(message = 'Account not activated'): ServiceException {
    return new ServiceException(message, HttpStatus.FORBIDDEN);
  }

  // ─────────────────────────────────────────────────────────────
  // Validation (INVALID_ARGUMENT)
  // ─────────────────────────────────────────────────────────────

  static validation(
    errors: Record<string, string[]>,
    message = 'Validation failed',
  ): ServiceException {
    return new ServiceException(
      `${message} (${JSON.stringify(errors)})`,
      HttpStatus.BAD_REQUEST,
      errors,
    );
  }

  // ─────────────────────────────────────────────────────────────
  // Business Logic (NOT_FOUND, FAILED_PRECONDITION, ABORTED)
  // ─────────────────────────────────────────────────────────────

  static entityNotFound(entityName: string, id?: string): ServiceException {
    const message =
      id !== undefined ? `${entityName} with id "${id}" not found` : `${entityName} not found`;
    return new ServiceException(message, HttpStatus.NOT_FOUND);
  }

  static operationNotAllowed(message = 'Operation not allowed'): ServiceException {
    return new ServiceException(message, HttpStatus.BAD_REQUEST);
  }

  static conflict(message = 'Operation conflict'): ServiceException {
    return new ServiceException(message, HttpStatus.CONFLICT);
  }

  // ─────────────────────────────────────────────────────────────
  // Infrastructure (UNAVAILABLE, RESOURCE_EXHAUSTED, INTERNAL)
  // ─────────────────────────────────────────────────────────────

  static databaseError(message = 'Database error'): ServiceException {
    return new ServiceException(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  static externalServiceError(message = 'External service error'): ServiceException {
    return new ServiceException(message, HttpStatus.SERVICE_UNAVAILABLE);
  }

  static rateLimitExceeded(message = 'Rate limit exceeded'): ServiceException {
    return new ServiceException(message, HttpStatus.TOO_MANY_REQUESTS);
  }

  // ─────────────────────────────────────────────────────────────
  // System (DEADLINE_EXCEEDED, INTERNAL, UNAVAILABLE)
  // ─────────────────────────────────────────────────────────────

  static timeout(message = 'Request timeout'): ServiceException {
    return new ServiceException(message, HttpStatus.REQUEST_TIMEOUT);
  }

  static internal(message = 'Internal server error'): ServiceException {
    return new ServiceException(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  static serviceUnavailable(message = 'Service unavailable'): ServiceException {
    return new ServiceException(message, HttpStatus.SERVICE_UNAVAILABLE);
  }
}
