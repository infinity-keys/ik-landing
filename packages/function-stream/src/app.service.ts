import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  streamListener(): string {
    return 'Hello World!';
  }
}
