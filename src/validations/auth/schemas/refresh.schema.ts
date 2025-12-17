import { IRefreshDto } from '@application/dtos/auth/refresh.dto';
import { JSONSchemaType } from 'ajv';

export const refreshSchema: JSONSchemaType<IRefreshDto> = {
  type: 'object',
  properties: {
    sid: {
      type: 'string',
      minLength: 36,
      maxLength: 36,
      pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
    },
  },
  required: ['sid'],
  additionalProperties: false,
};
