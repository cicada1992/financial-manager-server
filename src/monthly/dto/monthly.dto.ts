export class CreateMonthlyDto {
  name: string;
  amount: number;
  done: boolean;
  type: 'INCOME' | 'SPEND';
}

export class UpdateMonthlyDto {
  id: string;
  name: string;
  amount: number;
  done: boolean;
  type: 'INCOME' | 'SPEND';
}
