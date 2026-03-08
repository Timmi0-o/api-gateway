import { GetAdminPermissionsUseCase } from '@application/use-cases/admin/permissions/get-permissions.usecase';
import {
  GetMetadataObjectForGrpcRequest,
  IMetadataObjectForGrpcRequest,
} from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';

@Controller({ path: 'admin/permissions', version: '1' })
@UseGuards(RsaAuthGuard)
export class AdminPermissionsController {
  constructor(private readonly getAdminPermissionsUseCase: GetAdminPermissionsUseCase) {}

  @Get()
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Query() query: { preset?: string; limit?: number; page?: number },
  ): Promise<unknown> {
    return this.getAdminPermissionsUseCase.execute({
      data: {
        preset: query.preset,
        limit: query.limit,
        page: query.page,
      },
      metadata,
    });
  }
}
