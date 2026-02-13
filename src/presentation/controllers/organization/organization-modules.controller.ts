import { EditOrganizationModulesUseCase } from '@application/use-cases/organization-modules/edit/edit.usecase';
import { GetOrganizationModulesUseCase } from '@application/use-cases/organization-modules/get-modules/get-modules.usecase';
import {
  GetMetadataObjectForGrpcRequest,
  IMetadataObjectForGrpcRequest,
} from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';

@Controller({ path: 'organization/:organizationId/modules', version: '1' })
@UseGuards(RsaAuthGuard)
export class OrganizationModulesController {
  constructor(
    private readonly getOrganizationModulesUseCase: GetOrganizationModulesUseCase,
    private readonly editOrganizationModulesUseCase: EditOrganizationModulesUseCase,
  ) {}

  @Get()
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Query('preset') preset?: string,
  ): Promise<unknown> {
    return this.getOrganizationModulesUseCase.execute({
      data: { organizationId, preset: preset ?? 'MINIMAL' },
      metadata,
    });
  }

  @Patch()
  async edit(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Body() data: { added: string[]; deleted: string[] },
  ): Promise<{ success: boolean }> {
    return this.editOrganizationModulesUseCase.execute({
      data: { organizationId, added: data.added ?? [], deleted: data.deleted ?? [] },
      metadata,
    });
  }
}
