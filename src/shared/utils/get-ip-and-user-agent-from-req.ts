import { ServiceException } from '@shared/exceptions/service.exception';
import { Request } from 'express';

export const getIpAndUserAgentFromReq = (
  req: Request,
  options?: { notFoundErrors: boolean },
): { ipAddress: string; userAgent: string } => {
  const { notFoundErrors = false } = options ?? {};

  const ipAddress = req.ip ?? '';
  const userAgent = req.headers['user-agent'] ?? '';

  if ((!ipAddress || !userAgent) && notFoundErrors) {
    throw ServiceException.validation({
      ipAddress: !ipAddress ? ['Missing IP address'] : [],
      userAgent: !userAgent ? ['Missing user agent'] : [],
    });
  }

  return { ipAddress, userAgent };
};
