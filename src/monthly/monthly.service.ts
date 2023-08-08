import { Injectable } from '@nestjs/common';
import { CreateMonthlyDto, UpdateMonthlyDto } from './dto/monthly.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MonthlyEntity } from '../domain/monthly.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MonthlyService {
  constructor(
    @InjectRepository(MonthlyEntity)
    private monthlyRepository: Repository<MonthlyEntity>,
  ) {}

  findAll(): Promise<MonthlyEntity[]> {
    return this.monthlyRepository.find();
  }

  findOne(id: number): Promise<MonthlyEntity> {
    return this.monthlyRepository.findOne({ where: { id } });
  }

  async create(monthly: CreateMonthlyDto): Promise<MonthlyEntity[]> {
    await this.monthlyRepository.save(monthly);
    return this.monthlyRepository.find();
  }

  async update(monthly: UpdateMonthlyDto): Promise<MonthlyEntity[]> {
    const existed = await this.findOne(monthly.id);
    if (!existed) throw new Error('Monthly not found');
    const nextMonthly = { ...existed, ...monthly };
    await this.monthlyRepository.save(nextMonthly);
    return this.monthlyRepository.find();
  }

  async remove(id: number): Promise<MonthlyEntity[]> {
    await this.monthlyRepository.delete(id);
    return this.monthlyRepository.find();
  }
}
