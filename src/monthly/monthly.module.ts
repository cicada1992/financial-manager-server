import { Module } from '@nestjs/common';
import { MonthlyService } from './monthly.service';
import { MonthlyController } from './monthly.controller';
import { MonthlyEntity } from '../domain/monthly.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MonthlyEntity])],
  providers: [MonthlyService],
  controllers: [MonthlyController],
})
export class MonthlyModule {}
