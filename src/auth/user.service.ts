import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from 'src/domain/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private readonly saltRounds = 10;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByFields(options: FindOneOptions<User>): Promise<User | undefined> {
    return await this.userRepository.findOne(options);
  }

  async save(userDto: UserDto): Promise<User> {
    await this.transformPassword(userDto);
    return await this.userRepository.save(userDto);
  }

  private async transformPassword(user: UserDto): Promise<void> {
    const hashed = await hash(user.password, this.saltRounds);
    user.password = hashed;
    return Promise.resolve();
  }
}
