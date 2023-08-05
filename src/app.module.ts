import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MonthlyController } from './monthly/monthly.controller';

@Module({
  imports: [],
  controllers: [AppController, MonthlyController],
  providers: [AppService],
})
export class AppModule {}
