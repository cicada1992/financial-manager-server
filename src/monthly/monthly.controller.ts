import { Controller, Get } from '@nestjs/common';
import { INCOME_ROWS, IRow, SPEND_ROWS } from './data';

@Controller('monthly')
export class MonthlyController {
  @Get()
  findAll(): { spend: Array<IRow>; income: Array<IRow> } {
    return { spend: SPEND_ROWS, income: INCOME_ROWS };
  }
}
