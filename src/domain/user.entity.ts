import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Monthly } from './monthly.entity';

@Entity({ schema: 'test', name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Monthly, (monthly) => monthly.user, { nullable: true })
  monthly: Monthly;
}
