import { IUserDto } from '@application/dtos/user/user.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';

export class GetManyUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(): Promise<{
    meta: { total: number; limit: number; count: number };
    items: IUserDto[];
  }> {
    try {
      return await Promise.resolve({
        meta: {
          total: 3,
          limit: 10,
          count: 3,
        },
        items: [
          {
            id: '1',
            email: 'test@test.com',
            phone: '1234567890',
            username: 'test',
            role: 'admin',
            status: 'active',
            passwordHash: '1234567890',
            fullname: 'test',
            language: 'en',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '2',
            email: 'test2@test.com',
            phone: '1234567890',
            username: 'test2',
            role: 'user',
            status: 'active',
            passwordHash: '1234567890',
            fullname: 'test2',
            language: 'en',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '3',
            email: 'test3@test.com',
            phone: '1234567890',
            username: 'test3',
            role: 'user',
            status: 'active',
            passwordHash: '1234567890',
            fullname: 'test3',
            language: 'en',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
