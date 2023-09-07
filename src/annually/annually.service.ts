import { Injectable } from '@nestjs/common';
import { CreateAnnuallyDto, UpdateAnnuallyDto } from './dto/annually.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { YYYYMMDD } from 'src/types';
import dayjs from 'dayjs';
import { Annually } from 'src/domain/annually.entity';

@Injectable()
export class AnnuallyService {
  constructor(
    @InjectRepository(Annually)
    private annuallyRepository: Repository<Annually>,
  ) {}

  async findAll(userEmail: string, year: number): Promise<Annually[]> {
    const list = await this.annuallyRepository
      .createQueryBuilder('annually')
      .where('annually.userId = :userEmail', { userEmail })
      .getMany();
    return this.filterTargetYear(list, year);
  }

  findOne(id: number): Promise<Annually> {
    return this.annuallyRepository.findOne({ where: { id } });
  }

  async create(annually: CreateAnnuallyDto, year: number): Promise<Annually[]> {
    await this.annuallyRepository.save(annually as DeepPartial<Annually>);
    return this.findAll(annually.userId, year);
  }

  async update(annually: UpdateAnnuallyDto, year: number): Promise<Annually[]> {
    const existed = await this.findOne(annually.id);
    if (!existed) throw new Error('Annually not found');
    const nextAnnually = { ...existed, ...annually };
    await this.annuallyRepository.save(nextAnnually as DeepPartial<Annually>);
    return this.findAll(annually.userId, year);
  }

  async remove(id: number): Promise<void> {
    const existed = await this.findOne(id);
    if (!existed) throw new Error('Annually not found');
    await this.annuallyRepository.delete(id);
  }

  async copy(userEmail: string, year: number): Promise<Annually[]> {
    const targetMonthData = await this.findAll(userEmail, year);
    const cloned = structuredClone(targetMonthData);
    cloned.forEach((row) => {
      row.id = undefined;
      row.done = false;
      row.date = dayjs(row.date)
        .add(1, 'year')
        .format('YYYY-MM-DD') as YYYYMMDD;
    });
    await Promise.all(cloned.map((row) => this.annuallyRepository.save(row)));
    return this.findAll(userEmail, year);
  }

  private filterTargetYear(list: Annually[], year: number) {
    const isTarget = (row: Annually) => {
      const rowYear = dayjs(row.date).get('year');
      return Number(rowYear) === Number(year);
    };

    return list.filter(isTarget);
  }
}
