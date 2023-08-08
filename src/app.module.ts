import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MonthlyModule } from './monthly/monthly.module';
import { ormConfig } from './orm.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    MonthlyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
