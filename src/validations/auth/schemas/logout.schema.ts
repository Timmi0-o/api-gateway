import { ILogoutDto } from '@application/dtos/auth/logout.dto';
import { JSONSchemaType } from 'ajv';

interface ILogoutDtoWithUserId extends ILogoutDto {
  userId: string;
}

export const logoutSchema: JSONSchemaType<ILogoutDtoWithUserId> = {
  type: 'object',
  properties: {
    sid: {
      type: 'string',
      minLength: 36,
      maxLength: 36,
      pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
    },
    userId: {
      type: 'string',
      minLength: 36,
      maxLength: 36,
      pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
    },
  },
  required: ['sid', 'userId'],
  additionalProperties: false,
};
