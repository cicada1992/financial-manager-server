import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { IMonthly } from './interface/monthly.interface';
import { MonthlyService } from './monthly.service';
import { CreateMonthlyDto, UpdateMonthlyDto } from './dto/monthly.dto';

@Controller('monthly')
export class MonthlyController {
  constructor(private readonly monthlyService: MonthlyService) {}

  @Get()
  findAll(): Array<IMonthly> {
    return this.monthlyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): IMonthly {
    return this.monthlyService.findOne(id);
  }

  @Post()
  create(@Body() createMonthlyDto: CreateMonthlyDto): IMonthly[] {
    this.monthlyService.create(createMonthlyDto);
    return this.findAll();
  }

  @Put()
  update(@Body() updateMonthlyDto: UpdateMonthlyDto): IMonthly[] {
    this.monthlyService.update(updateMonthlyDto);
    return this.findAll();
  }
}
