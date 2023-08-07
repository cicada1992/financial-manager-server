import { Injectable } from '@nestjs/common';
import { IMonthly } from './interface/monthly.interface';
import { CreateMonthlyDto, UpdateMonthlyDto } from './dto/monthly.dto';

@Injectable()
export class MonthlyService {
  private monthlyList: Array<IMonthly> = [];

  findAll(): Array<IMonthly> {
    return this.monthlyList;
  }

  findOne(id: string): IMonthly {
    return this.monthlyList.find((row) => row.id === id);
  }

  create(monthly: CreateMonthlyDto): void {
    this.monthlyList.push({
      id: String(this.monthlyList.length + 1),
      ...monthly,
    });
  }

  update(monthly: UpdateMonthlyDto): void {
    const target = this.monthlyList.find((row) => row.id === monthly.id);
    if (!target) throw new Error('Not found');
    target.name = monthly.name;
    target.amount = monthly.amount;
    target.done = monthly.done;
  }

  remove(id: string): void {
    this.monthlyList = this.monthlyList.filter((row) => row.id !== id);
  }
}
