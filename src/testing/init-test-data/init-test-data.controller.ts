import { Controller, Get } from '@nestjs/common';
import { StatusMessageDto } from 'src/shared/status-message.dto';
import { InitTestDataService } from './init-test-data.service';

@Controller('api/init-test-data')
export class InitTestDataController {
  constructor(private initTestDataService: InitTestDataService) {}

  //http://127.0.0.1:3001/api/init-test-data/init
  @Get('init')
  async init(): Promise<StatusMessageDto> {
    return await this.initTestDataService.initData();
  }
}
