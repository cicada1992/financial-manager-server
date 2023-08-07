import { Module } from '@nestjs/common';
import { MonthlyService } from './monthly.service';
import { MonthlyController } from './monthly.controller';

@Module({
  providers: [MonthlyService],
  controllers: [MonthlyController],
})
export class MonthlyModule {}
