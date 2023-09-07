import { YYYYMMDD } from 'src/types';

export class CreateAnnuallyDto {
  name: string;
  amount: number;
  done: boolean;
  type: 'INCOME' | 'SPEND';
  date: YYYYMMDD;
  /** user email */
  userId: string;
}

export class UpdateAnnuallyDto {
  id: number;
  name: string;
  amount: number;
  done: boolean;
  type: 'INCOME' | 'SPEND';
  date: YYYYMMDD;
  /** user email */
  userId: string;
}
