import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MonthlyService } from './monthly.service';
import { CreateMonthlyDto, UpdateMonthlyDto } from './dto/monthly.dto';
import { MonthlyEntity } from '../domain/monthly.entity';

@Controller('monthly')
export class MonthlyController {
  constructor(private readonly monthlyService: MonthlyService) {}

  @Get()
  async findAll(): Promise<MonthlyEntity[]> {
    return await this.monthlyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<MonthlyEntity> {
    return await this.monthlyService.findOne(id);
  }

  @Post()
  create(@Body() createMonthlyDto: CreateMonthlyDto): Promise<MonthlyEntity[]> {
    return this.monthlyService.create(createMonthlyDto);
  }

  @Put(':id')
  update(@Body() updateMonthlyDto: UpdateMonthlyDto): Promise<MonthlyEntity[]> {
    return this.monthlyService.update(updateMonthlyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<MonthlyEntity[]> {
    return this.monthlyService.remove(id);
  }
}
