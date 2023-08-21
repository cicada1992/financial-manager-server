import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ILoginResponse, ISecurityPayload } from './types';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/domain/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtSerivce: JwtService,
  ) {}

  async registerUser(user: UserDto): Promise<ILoginResponse> {
    const alreadyExists = await this.userService.findByFields({
      where: { username: user.username },
    });
    if (alreadyExists) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const registered = await this.userService.save(user);
    return { accessToken: this.generateToken(registered) };
  }

  async validateUser(user: UserDto): Promise<ILoginResponse> {
    const foundUser = await this.getValidUser(user);
    return { accessToken: this.generateToken(foundUser) };
  }

  async updateUser(user: UserDto): Promise<ILoginResponse> {
    const foundUser = await this.getValidUser(user);
    const nextUser = {
      ...foundUser,
      ...user,
      password: foundUser.password,
    };
    await this.userService.update(nextUser);
    return { accessToken: this.generateToken(nextUser) };
  }

  async validateToken(payload: ISecurityPayload): Promise<UserDto | undefined> {
    return await this.userService.findByFields({ where: { id: payload.id } });
  }

  private generateToken(user: User): string {
    const payload: ISecurityPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    return this.jwtSerivce.sign(payload);
  }

  private async getValidUser(user: UserDto) {
    const foundUser = await this.userService.findByFields({
      where: { email: user.email },
    });
    if (!foundUser) throw new UnauthorizedException();
    const isValid = await compare(user.password, foundUser.password);
    if (!isValid) throw new UnauthorizedException();
    return foundUser;
  }
}
