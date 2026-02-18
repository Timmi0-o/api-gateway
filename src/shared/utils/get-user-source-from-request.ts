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
];

const USER_SOURCE_MAP = {
  'https://tourgis.ru': 'TOURGIS',
  'http://localhost:3155': 'ADMIN',
  'http://localhost:1099': 'ADMIN',
  'https://api.tourgis.ru': 'ADMIN',
  'http://api.tourgis.ru': 'ADMIN',
} as const;

export const getUserSourceFromRequest = (
  req: Request,
): keyof typeof USER_SOURCE_MAP | undefined => {
  const protocol = req.protocol;
  const host = req.get('host');

  const origin = `${protocol}://${host}`;

  if (!USER_SOURCE_WHITELIST.includes(origin) || !USER_SOURCE_MAP[origin]) {
    return undefined;
  }
  return USER_SOURCE_MAP[origin];
};
