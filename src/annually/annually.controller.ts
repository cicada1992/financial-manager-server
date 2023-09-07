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
import { AnnuallyService } from './annually.service';
import { CreateAnnuallyDto, UpdateAnnuallyDto } from './dto/annually.dto';
import { Annually } from 'src/domain/annually.entity';

@Controller('annually')
export class AnnuallyController {
  constructor(private readonly annuallyService: AnnuallyService) {}

  @Get()
  findAll(
    @Query('userEmail') userEmail: string,
    @Query('year') year: number,
  ): Promise<Annually[]> {
    return this.annuallyService.findAll(userEmail, year);
  }

  @Get(':userEmail/:id')
  findOne(@Param('id') id: number): Promise<Annually> {
    return this.annuallyService.findOne(id);
  }

  @Post()
  create(
    @Body() createAnnuallyDto: CreateAnnuallyDto,
    @Query('year') year: number,
  ): Promise<Annually[]> {
    return this.annuallyService.create(createAnnuallyDto, year);
  }

  @Put(':id')
  update(
    @Body() updateAnnuallyDto: UpdateAnnuallyDto,
    @Query('year') year: number,
  ): Promise<Annually[]> {
    return this.annuallyService.update(updateAnnuallyDto, year);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.annuallyService.remove(id);
  }

  @Get('copy')
  copy(
    @Query('userEmail') userEmail: string,
    @Query('year') year: number,
  ): Promise<Annually[]> {
    return this.annuallyService.copy(userEmail, year);
  }
}
