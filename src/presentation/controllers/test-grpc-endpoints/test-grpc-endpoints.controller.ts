import { TestGrpcUseCase } from '@application/use-cases/test-grpc/test-grpc.usecase';
import { Body, Controller, Post } from '@nestjs/common';

@Controller({ path: 'test-grpc-endpoints', version: '1' })
export class TestGrpcEndpointsController {
  constructor(private readonly testGrpcUseCase: TestGrpcUseCase) {}

  @Post()
  async testGrpcEndpoints(
    @Body() data: { messagePattern: string; data: unknown; metadata: Record<string, unknown> },
  ): Promise<{ success: boolean; data: unknown }> {
    return this.testGrpcUseCase.execute(data);
  }
}
