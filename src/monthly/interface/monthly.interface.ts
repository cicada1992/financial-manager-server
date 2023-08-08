export interface IMonthly {
  id: number;
  name: string;
  amount: number;
  done: boolean;
  type: 'INCOME' | 'SPEND';
}
