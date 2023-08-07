import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyService } from './monthly.service';

describe('MonthlyService', () => {
  let service: MonthlyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonthlyService],
    }).compile();

    service = module.get<MonthlyService>(MonthlyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
