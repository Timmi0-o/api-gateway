import { ISendResetPasswordEmailDto } from '@application/dtos/auth/send-reset-password-email.dto';
import { JSONSchemaType } from 'ajv';

export const sendResetPasswordEmailSchema: JSONSchemaType<ISendResetPasswordEmailDto> = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
  },
  required: ['email'],
  additionalProperties: false,
};
