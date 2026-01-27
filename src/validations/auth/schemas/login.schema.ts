import { EUserSource, ILoginDto } from '@application/dtos/auth/login.dto';
import { JSONSchemaType } from 'ajv';

export const loginSchema: JSONSchemaType<ILoginDto> = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      minLength: 3,
    },
    password: {
      type: 'string',
      minLength: 8,
    },
    fingerprint: {
      type: 'string',
    },
    ipAddress: {
      type: 'string',
    },
    userAgent: {
      type: 'string',
    },
    source: {
      type: 'string',
      enum: [EUserSource.TOURGIS, EUserSource.ADMIN, EUserSource.BUSINESS, EUserSource.FRANCHISE],
    },
  },
  required: ['username', 'password', 'fingerprint', 'ipAddress', 'userAgent', 'source'],
  additionalProperties: false,
};
