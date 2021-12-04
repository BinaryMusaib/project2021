import { Test, TestingModule } from '@nestjs/testing';
import { ExamineeListService } from './examinee-list.service';

describe('ExamineeListService', () => {
  let service: ExamineeListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamineeListService],
    }).compile();

    service = module.get<ExamineeListService>(ExamineeListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
