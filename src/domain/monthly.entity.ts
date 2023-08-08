import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'test', name: 'monthly' })
export class MonthlyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  amount: number;

  @Column()
  done: boolean;

  @Column()
  type: 'INCOME' | 'SPEND';
}
