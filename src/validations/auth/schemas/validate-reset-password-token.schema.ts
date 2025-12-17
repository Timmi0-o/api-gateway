import { IValidateResetPasswordTokenDto } from '@application/dtos/auth/validate-reset-password-token.dto';
import { JSONSchemaType } from 'ajv';

const validateResetPasswordTokenSchema: JSONSchemaType<IValidateResetPasswordTokenDto> = {
  type: 'object',
  properties: {
    token: {
      type: 'string',
      minLength: 1,
    },
  },
  required: ['token'],
  additionalProperties: false,
};
