import { IRegisterDto } from '@application/dtos/user/register.dto';
import { JSONSchemaType } from 'ajv';

export const registerSchema: JSONSchemaType<IRegisterDto> = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    },
    phone: {
      type: 'string',
      nullable: true,
      pattern: '^\\+?[1-9]\\d{1,14}$',
    },
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
      pattern: '^.{8,}$',
    },
    name: {
      type: 'string',
    },
    surname: {
      type: 'string',
    },
    patronymic: {
      type: 'string',
    },
    source: {
      type: 'string',
      enum: ['TOURGIS', 'ADMIN', 'BUSINESS', 'FRANCHIZE'],
    },
  },
  required: ['email', 'password', 'username', 'name', 'surname', 'patronymic', 'source'],
  additionalProperties: false,
};
