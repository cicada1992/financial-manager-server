import { Module } from '@nestjs/common';
import { AnnuallyService } from './annually.service';
import { AnnuallyController } from './annually.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Annually } from 'src/domain/annually.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Annually]), AuthModule],
  providers: [AnnuallyService],
  controllers: [AnnuallyController],
})
export class AnnuallyModule {}
