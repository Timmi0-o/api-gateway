export const MICROSERVICE_CLIENT_PROXY_SERVICE_TOKEN = Symbol('MICROSERVICE_CLIENT_PROXY_TOKEN');

export interface IMicroserviceClientProxyService {
  send<IInput, IOutput>({
    messagePattern,
    data,
  }: {
    messagePattern: string;
    data: IInput;
  }): Promise<IOutput>;
}
