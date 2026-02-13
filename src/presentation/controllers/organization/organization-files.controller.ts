import { GetOrganizationFilesUseCase } from '@application/use-cases/organization-files/get-organization-files/get-organization-files.usecase';
import {
  GetMetadataObjectForGrpcRequest,
  IMetadataObjectForGrpcRequest,
} from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { Permission } from '@infrastructure/decorators/permission.decorator';
import { PermissionGuard } from '@infrastructure/guards/permission.guard';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { Permissions } from '@tourgis/common';
import { IGetOrganizationFilesResponse } from '@tourgis/contracts/dist/files/v1';

@Controller({ path: 'organization/:organizationId/files', version: '1' })
export class OrganizationFilesController {
  constructor(private readonly getOrganizationFilesUseCase: GetOrganizationFilesUseCase) {}

  @Get()
  @UseGuards(RsaAuthGuard, PermissionGuard)
  @Permission(Permissions.file.read)
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Query() query: { path?: string; requiredIds?: string; preset?: string },
  ): Promise<IGetOrganizationFilesResponse> {
    const requiredIds = query.requiredIds ? (JSON.parse(query.requiredIds) as string[]) : [];
    return this.getOrganizationFilesUseCase.execute({
      data: {
        path: query.path,
        requiredIds,
        preset: query.preset ?? 'MINIMAL',
        organizationId,
      },
      metadata,
    });
  }
}
