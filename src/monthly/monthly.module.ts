import { Module } from '@nestjs/common';
import { MonthlyService } from './monthly.service';
import { MonthlyController } from './monthly.controller';
import { Monthly } from '../domain/monthly.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Monthly]), AuthModule],
  providers: [MonthlyService],
  controllers: [MonthlyController],
})
export class MonthlyModule {}
