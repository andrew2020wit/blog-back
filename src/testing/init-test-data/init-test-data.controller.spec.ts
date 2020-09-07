import { Test, TestingModule } from '@nestjs/testing';
import { InitTestDataController } from './init-test-data.controller';

describe('InitTestData Controller', () => {
  let controller: InitTestDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InitTestDataController],
    }).compile();

    controller = module.get<InitTestDataController>(InitTestDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
