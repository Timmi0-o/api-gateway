import { Request } from 'express';

const USER_IDENTITY_KEY_MAP: Record<string, string> = {
  'https://tourgis.ru': 'TOURGIS',
  'http://localhost:3155': 'ADMIN',
  'https://localhost:3155': 'ADMIN',
  'http://localhost:1099': 'ADMIN',
  'https://localhost:1099': 'ADMIN',
  'https://api.tourgis.ru': 'ADMIN',
  'http://api.tourgis.ru': 'ADMIN',
  'http://localhost:2044': 'FRANCHISE',
};

export const getUserIdentityKeyFromRequest = (req: Request): string | undefined => {
  const origin =
    req.get('origin') || req.get('referer')?.replace(/\/$/, '').split('/').slice(0, 3).join('/');

  if (!origin || !USER_IDENTITY_KEY_MAP[origin]) {
    return undefined;
  }

  return USER_IDENTITY_KEY_MAP[origin];
};
