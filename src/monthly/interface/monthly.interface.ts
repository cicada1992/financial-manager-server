export interface IMonthly {
  id: string;
  name: string;
  amount: number;
  done: boolean;
  type: 'INCOME' | 'SPEND';
}
