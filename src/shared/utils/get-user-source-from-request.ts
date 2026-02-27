import { ServiceException } from '@shared/exceptions/service.exception';
import { Request } from 'express';

const USER_SOURCE_WHITELIST = [
  'https://tourgis.ru',
  'http://localhost:3155',
  'http://localhost:1099',
  'https://api.tourgis.ru',
  'http://api.tourgis.ru',
  'https://api.tourgis.ru',
  'http://api.tourgis.ru',
  'https://api.tourgis.ru',
  'http://localhost:2044',
  'https://localhost:2044',
];

const USER_SOURCE_MAP = {
  'https://tourgis.ru': 'TOURGIS',
  'http://localhost:3155': 'ADMIN',
  'http://localhost:1099': 'ADMIN',
  'https://api.tourgis.ru': 'ADMIN',
  'http://api.tourgis.ru': 'ADMIN',
  'https://localhost:2044': 'FRANCHISE',
  'http://localhost:2044': 'FRANCHISE',
} as const;

export const getUserSourceFromRequest = (
  req: Request,
): keyof typeof USER_SOURCE_MAP | undefined => {
  const origin =
    req.get('origin') ||
    (req.get('referer')?.replace(/\/$/, '').split('/').slice(0, 3).join('/') as string);

  if (!USER_SOURCE_WHITELIST.includes(origin) || !USER_SOURCE_MAP[origin]) {
    throw ServiceException.forbidden('CANNOT_GET_USER_SOURCE');
  }
  return USER_SOURCE_MAP[origin];
};
