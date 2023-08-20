export class CreateMonthlyDto {
  name: string;
  amount: number;
  done: boolean;
  type: 'INCOME' | 'SPEND';
  month: number;
  /** user email */
  userId: string;
}

export class UpdateMonthlyDto {
  id: number;
  name: string;
  amount: number;
  done: boolean;
  type: 'INCOME' | 'SPEND';
  month: number;
  /** user email */
  userId: string;
}
