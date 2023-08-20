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

@Controller('monthly')
export class MonthlyController {
  constructor(private readonly monthlyService: MonthlyService) {}

  @Get()
  async findAll(
    @Query('userEmail') userEmail: string,
    @Query('month') month: number,
  ): Promise<Monthly[]> {
    return await this.monthlyService.findAll(userEmail, month);
  }

  @Get(':userEmail/:id')
  async findOne(@Param('id') id: number): Promise<Monthly> {
    return await this.monthlyService.findOne(id);
  }

  @Post()
  create(@Body() createMonthlyDto: CreateMonthlyDto): Promise<Monthly[]> {
    return this.monthlyService.create(createMonthlyDto);
  }

  @Put(':id')
  update(@Body() updateMonthlyDto: UpdateMonthlyDto): Promise<Monthly[]> {
    return this.monthlyService.update(updateMonthlyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<Monthly[]> {
    return this.monthlyService.remove(id);
  }
}
