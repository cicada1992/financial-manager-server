import { Injectable } from '@nestjs/common';
import { CreateMonthlyDto, UpdateMonthlyDto } from './dto/monthly.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Monthly } from '../domain/monthly.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class MonthlyService {
  constructor(
    @InjectRepository(Monthly)
    private monthlyRepository: Repository<Monthly>,
  ) {}

  findAll(userEmail: string): Promise<Monthly[]> {
    return this.monthlyRepository
      .createQueryBuilder('monthly')
      .where('monthly.userId = :userEmail', { userEmail })
      .getMany();
  }

  findOne(id: number): Promise<Monthly> {
    return this.monthlyRepository.findOne({ where: { id } });
  }

  async create(monthly: CreateMonthlyDto): Promise<Monthly[]> {
    await this.monthlyRepository.save(monthly as DeepPartial<Monthly>);
    return this.findAll(monthly.userId);
  }

  async update(monthly: UpdateMonthlyDto): Promise<Monthly[]> {
    const existed = await this.findOne(monthly.id);
    if (!existed) throw new Error('Monthly not found');
    const nextMonthly = { ...existed, ...monthly };
    await this.monthlyRepository.save(nextMonthly as DeepPartial<Monthly>);
    return this.findAll(monthly.userId);
  }

  async remove(id: number): Promise<Monthly[]> {
    const existed = await this.findOne(id);
    if (!existed) throw new Error('Monthly not found');
    await this.monthlyRepository.delete(id);
    return this.findAll(existed.userId);
  }
}
