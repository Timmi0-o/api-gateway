import { Injectable, LogLevel, LoggerService as NestLoggerService } from '@nestjs/common';

export interface LoggerExtendtypes {
  configuration(message: any, ...optionalParams: any[]): any;
}

@Injectable()
export class LoggerService implements NestLoggerService, LoggerExtendtypes {
  log(message: unknown, context?: string) {
    this.print('log', message, context);
  }

  error(message: unknown, trace?: string, context?: string) {
    this.print('error', message, context, trace);
  }

  warn(message: unknown, context?: string) {
    this.print('warn', message, context);
  }

  debug(message: unknown, context?: string) {
    this.print('debug', message, context);
  }

  verbose(message: unknown, context?: string) {
    this.print('verbose', message, context);
  }

  configuration(message: unknown, context?: string) {
    this.print('configuration', message, context);
  }

  private print(
    level: LogLevel | 'configuration',
    message: unknown,
    context?: string,
    trace?: string,
  ) {
    const msg = String(message);

    // Цвета уровней логов
    const levelColors: Record<LogLevel | 'configuration', string> = {
      log: '\x1b[37m', // белый
      warn: '\x1b[33m', // желтый (можно кастом)
      error: '\x1b[31m', // красный
      debug: '\x1b[36m', // cyan
      verbose: '\x1b[90m', // gray
      fatal: '\x1b[31m', // красный
      configuration: '\x1b[34m', // голубой
    };

    // Цвет для контекста (NestFactory, InstanceLoader...)
    const contextColor = '\x1b[33m'; // желтый

    const levelPart = `${levelColors[level] ?? '\x1b[37m'}[${level.toUpperCase()}]\x1b[0m`;
    const contextPart = context ? `${contextColor}[${context}]\x1b[0m ` : '';
    const messagePart =
      level === 'configuration'
        ? `${levelColors[level] ?? '\x1b[37m'}${msg}\x1b[0m`
        : `\x1b[32m${msg}\x1b[0m`; // зеленый для основного текста

    const line = `${levelPart} ${contextPart}${messagePart}`;

    if (level === 'error') {
      console.error(line);
      if (trace) console.error(`\x1b[31m${trace}\x1b[0m`);
    } else {
      console.log(line);
    }
  }
}
