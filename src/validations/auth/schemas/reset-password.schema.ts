import { IResetPasswordDto } from '@application/dtos/auth/reset-password.dto';
import { JSONSchemaType } from 'ajv';

export const resetPasswordSchema: JSONSchemaType<IResetPasswordDto> = {
  type: 'object',
  properties: {
    token: {
      type: 'string',
      minLength: 1,
    },
    password: {
      type: 'string',
      minLength: 8,
    },
    meta: {
      type: 'object',
      properties: {
        ipAddress: {
          type: 'string',
        },
        userAgent: {
          type: 'string',
        },
        location: {
          type: 'string',
        },
      },
      required: ['ipAddress', 'userAgent', 'location'],
      additionalProperties: false,
    },
  },
  required: ['token', 'password', 'meta'],
  additionalProperties: false,
};
