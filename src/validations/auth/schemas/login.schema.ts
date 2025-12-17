import { ILoginDto } from '@application/dtos/auth/login.dto';
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
  },
  required: ['username', 'password', 'fingerprint', 'ipAddress', 'userAgent'],
  additionalProperties: false,
};
