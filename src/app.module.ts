import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MonthlyModule } from './monthly/monthly.module';

@Module({
  imports: [ConfigModule.forRoot(), MonthlyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
