import { ServiceException } from '@shared/exceptions/service.exception';
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
  'https://localhost:3044': 'BUSINESS',
  'http://localhost:3044': 'BUSINESS',
};

export const getUserIdentityKeyFromRequest = (req: Request): string | undefined => {
  const origin =
    req.get('origin') || req.get('referer')?.replace(/\/$/, '').split('/').slice(0, 3).join('/');

  const secretIdentityKey = req.get('tourgis-custom-user-identity-key');

  const identityKey =
    secretIdentityKey || USER_IDENTITY_KEY_MAP[origin as keyof typeof USER_IDENTITY_KEY_MAP];

  if (!secretIdentityKey && (!origin || !USER_IDENTITY_KEY_MAP[origin])) {
    throw ServiceException.forbidden('CANNOT_GET_USER_IDENTITY_KEY');
  }

  return identityKey;
};
