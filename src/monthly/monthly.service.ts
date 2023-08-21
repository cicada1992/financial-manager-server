import { Injectable } from '@nestjs/common';
import { CreateMonthlyDto, UpdateMonthlyDto } from './dto/monthly.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Monthly } from '../domain/monthly.entity';
import { DeepPartial, Repository } from 'typeorm';
import { YYYYMM, YYYYMMDD } from 'src/types';
import dayjs from 'dayjs';
import { User } from 'src/domain/user.entity';

@Injectable()
export class MonthlyService {
  constructor(
    @InjectRepository(Monthly)
    private monthlyRepository: Repository<Monthly>,
    @InjectRepository(User)
    private authRepository: Repository<User>,
  ) {}

  async findAll(userEmail: string, targetDate: YYYYMM): Promise<Monthly[]> {
    const { referenceDate } = await this.authRepository.findOne({
      where: { email: userEmail },
    });
    const list = await this.monthlyRepository
      .createQueryBuilder('monthly')
      .where('monthly.userId = :userEmail', { userEmail })
      .getMany();
    return this.filterTargetMonth(list, targetDate, referenceDate);
  }

  findOne(id: number): Promise<Monthly> {
    return this.monthlyRepository.findOne({ where: { id } });
  }

  async create(
    monthly: CreateMonthlyDto,
    targetDate: YYYYMM,
  ): Promise<Monthly[]> {
    await this.monthlyRepository.save(monthly as DeepPartial<Monthly>);
    return this.findAll(monthly.userId, targetDate);
  }

  async update(
    monthly: UpdateMonthlyDto,
    targetDate: YYYYMM,
  ): Promise<Monthly[]> {
    const existed = await this.findOne(monthly.id);
    if (!existed) throw new Error('Monthly not found');
    const nextMonthly = { ...existed, ...monthly };
    await this.monthlyRepository.save(nextMonthly as DeepPartial<Monthly>);
    return this.findAll(monthly.userId, targetDate);
  }

  async remove(id: number): Promise<void> {
    const existed = await this.findOne(id);
    if (!existed) throw new Error('Monthly not found');
    await this.monthlyRepository.delete(id);
  }

  private filterTargetMonth(
    list: Monthly[],
    date: YYYYMMDD | YYYYMM,
    referenceDate: number,
  ) {
    // ex) 기준일 7월 25일 경우, 2023-07-25 ~ 2023-08-24 사이에 속하는 것만 가져오도록
    const targetStartDate = dayjs(date).set('date', referenceDate);
    const targetEndDate = dayjs(date)
      .set('date', referenceDate)
      .add(1, 'month');
    const isTarget = (item: Monthly) => {
      const converted = dayjs(item.date);
      return (
        (converted.isSame(targetStartDate) ||
          converted.isAfter(targetStartDate)) &&
        converted.isBefore(targetEndDate)
      );
    };

    return list.filter(isTarget);
  }
}
