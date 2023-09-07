import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { YYYYMMDD } from 'src/types';

@Entity({ schema: 'test', name: 'annually' })
export class Annually {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'boolean' })
  done: boolean;

  @Column({ type: 'varchar' })
  type: 'INCOME' | 'SPEND';

  @Column({ type: 'varchar' })
  date: YYYYMMDD;

  @Column({ type: 'varchar' })
  userId: string;

  @ManyToOne(() => User, (user) => user.email)
  user: User;
}
