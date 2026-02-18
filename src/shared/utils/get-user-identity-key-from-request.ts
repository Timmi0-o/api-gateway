import { Request } from 'express';

const USER_IDENTITY_KEY_MAP: Record<string, string> = {
  'https://tourgis.ru': 'TOURGIS',
  'http://localhost:3155': 'ADMIN',
  'htts://localhost:3155': 'ADMIN',
  'http://localhost:1099': 'ADMIN',
  'htts://localhost:1099': 'ADMIN',
  'https://api.tourgis.ru': 'ADMIN',
  'http://api.tourgis.ru': 'ADMIN',
};

export const getUserIdentityKeyFromRequest = (req: Request): string | undefined => {
  const origin =
    req.get('origin') ||
    req.get('referer')?.replace(/\/$/, '').split('/').slice(0, 3).join('/') ||
    buildOriginFromHost(req);

  if (!origin || !USER_IDENTITY_KEY_MAP[origin]) {
    return undefined;
  }

  return USER_IDENTITY_KEY_MAP[origin];
};

const buildOriginFromHost = (req: Request): string | undefined => {
  const proto = req.get('x-forwarded-proto') || req.protocol || 'https';
  const host = req.get('x-forwarded-host') || req.get('host');

  if (!host) return undefined;

  return `${proto}://${host}`;
};
