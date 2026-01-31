import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EOrganizationSubjects } from '@tourgis/common';
import { IRoleMinimalDto } from '@tourgis/contracts/dist/organization/v1';

export class GetOrganizationRolesUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(
    commonUserId: string,
    query: {
      select?: string[];
      filter?: string;
      limit?: number;
      offset?: number;
      include?: string;
      organizationId: string;
    },
  ): Promise<IRoleMinimalDto[]> {
    try {
      const res = await this.clientProxy.send<unknown, IRoleMinimalDto[]>({
        messagePattern: EOrganizationSubjects.ROLE_GET_MANY,
        data: {
          organizationId: query.organizationId,
          select: query.select ?? undefined,
          filter: query.filter
            ? { ...JSON.parse(query.filter), name: { not: 'Владелец' } }
            : undefined,
          limit: query?.limit ? +query.limit : 25,
          offset: query.offset ?? 0,
          include: query?.include ? JSON.parse(query?.include) : undefined,
        },
        metadata: {
          commonUserId,
        },
      });

      return res;
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
