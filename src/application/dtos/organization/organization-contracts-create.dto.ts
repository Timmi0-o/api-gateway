export interface ICreateOrganizationContractFileDto {
  fileName: string;
  originalName: string;
  mimeType: string;
  fileSize: number;
  fileUrl: string;
  metadata: Record<string, unknown>;
}

export interface ICreateOrganizationContractsBodyDto {
  registerRequestId: string;
  files: ICreateOrganizationContractFileDto[];
}

export interface ICreateOrganizationContractsResponseDto {
  count: number;
  errors: unknown[];
}
