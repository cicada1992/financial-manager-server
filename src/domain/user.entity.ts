import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Monthly } from './monthly.entity';

@Entity({ schema: 'test', name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  /** 월 기준일 (보통 월급날) */
  @Column({ type: 'int' })
  referenceDate: number;

  @OneToMany(() => Monthly, (monthly) => monthly.id)
  monthly: Monthly;
}
