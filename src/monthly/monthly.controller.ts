import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MonthlyService } from './monthly.service';
import { CreateMonthlyDto, UpdateMonthlyDto } from './dto/monthly.dto';
import { Monthly } from '../domain/monthly.entity';
import { YYYYMM } from 'src/types';

@Controller('monthly')
export class MonthlyController {
  constructor(private readonly monthlyService: MonthlyService) {}

  @Get()
  async findAll(
    @Query('userEmail') userEmail: string,
    @Query('date') date: YYYYMM,
  ): Promise<Monthly[]> {
    return await this.monthlyService.findAll(userEmail, date);
  }

  @Get(':userEmail/:id')
  async findOne(@Param('id') id: number): Promise<Monthly> {
    return await this.monthlyService.findOne(id);
  }

  @Post()
  create(
    @Body() createMonthlyDto: CreateMonthlyDto,
    @Query('date') date: YYYYMM,
  ): Promise<Monthly[]> {
    return this.monthlyService.create(createMonthlyDto, date);
  }

  @Put(':id')
  update(
    @Body() updateMonthlyDto: UpdateMonthlyDto,
    @Query('date') date: YYYYMM,
  ): Promise<Monthly[]> {
    return this.monthlyService.update(updateMonthlyDto, date);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.monthlyService.remove(id);
  }
}
