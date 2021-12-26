import { Test, TestingModule } from '@nestjs/testing';
import { PrepareResultService } from './prepare-result.service';

describe('PrepareResultService', () => {
  let service: PrepareResultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrepareResultService],
    }).compile();

    service = module.get<PrepareResultService>(PrepareResultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
