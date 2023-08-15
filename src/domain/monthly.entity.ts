import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ schema: 'test', name: 'monthly' })
export class Monthly {
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

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.email)
  user: User;
}
