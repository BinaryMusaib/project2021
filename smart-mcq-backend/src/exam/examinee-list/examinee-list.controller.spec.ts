import { Test, TestingModule } from '@nestjs/testing';
import { ExamineeListController } from './examinee-list.controller';

describe('ExamineeListController', () => {
  let controller: ExamineeListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamineeListController],
    }).compile();

    controller = module.get<ExamineeListController>(ExamineeListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
