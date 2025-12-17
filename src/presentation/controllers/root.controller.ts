import { Controller, Get } from '@nestjs/common';

@Controller({ path: '/' })
export class RootController {
  @Get()
  helloWorld(): { result: string } {
    return {
      result: 'Hello World',
    };
  }
}
