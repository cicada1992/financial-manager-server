import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
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

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
