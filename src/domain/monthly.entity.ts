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

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'boolean' })
  done: boolean;

  @Column({ type: 'varchar' })
  type: 'INCOME' | 'SPEND';

  @Column({ type: 'varchar' })
  userId: string;

  @ManyToOne(() => User, (user) => user.email)
  user: User;
}
