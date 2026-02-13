import { GetOrganizationPermissionsUseCase } from '@application/use-cases/organization-permissions/get/get-permissions.usecase';
import {
  GetMetadataObjectForGrpcRequest,
  IMetadataObjectForGrpcRequest,
} from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';

@Controller({ path: 'organization/:organizationId/permissions', version: '1' })
export class OrganizationPermissionsController {
  constructor(
    private readonly getOrganizationPermissionsUseCase: GetOrganizationPermissionsUseCase,
  ) {}

  @Get()
  @UseGuards(RsaAuthGuard)
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Query() query: { preset?: string; limit?: number; offset?: number },
  ): Promise<unknown> {
    return this.getOrganizationPermissionsUseCase.execute({
      data: {
        organizationId,
        preset: query.preset,
        limit: query.limit,
        offset: query.offset,
      },
      metadata,
    });
  }
}
