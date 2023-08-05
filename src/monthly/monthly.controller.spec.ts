import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyController } from './monthly.controller';

describe('MonthlyController', () => {
  let controller: MonthlyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonthlyController],
    }).compile();

    controller = module.get<MonthlyController>(MonthlyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
