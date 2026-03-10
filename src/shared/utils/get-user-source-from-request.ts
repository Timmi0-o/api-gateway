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
  'https://localhost:3044',
  'http://localhost:3044',
  'Postman',
];

const USER_SOURCE_MAP = {
  'https://tourgis.ru': 'TOURGIS',
  'http://localhost:3155': 'ADMIN',
  'http://localhost:1099': 'ADMIN',
  'https://api.tourgis.ru': 'ADMIN',
  'http://api.tourgis.ru': 'ADMIN',
  'https://localhost:2044': 'FRANCHISE',
  'http://localhost:2044': 'FRANCHISE',
  'https://localhost:3044': 'BUSINESS',
  'http://localhost:3044': 'BUSINESS',
  Postman: 'POSTMAN',
} as const;

export const getUserSourceFromRequest = (
  req: Request,
): keyof typeof USER_SOURCE_MAP | undefined => {
  const origin =
    req.get('origin') ||
    (req.get('referer')?.replace(/\/$/, '').split('/').slice(0, 3).join('/') as string);

  const secretSource = req.get('tourgis-custom-user-source');

  const source = secretSource || USER_SOURCE_MAP[origin];

  if (!secretSource && (!USER_SOURCE_WHITELIST.includes(origin) || !source)) {
    throw ServiceException.forbidden('CANNOT_GET_USER_SOURCE');
  }
  return source;
};
