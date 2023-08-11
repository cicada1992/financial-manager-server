import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { MyAuthGuard } from './security/auth.guard';
import { ILoginResponse, ISecurityPayload } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registerUser(
    @Body() userDto: UserDto,
    @Res() res: Response,
  ): Promise<ILoginResponse> {
    const jwt = await this.authService.registerUser(userDto);
    res.setHeader('Authorization', `Bearer ${jwt.accessToken}`);
    return res.json(jwt) as unknown as ILoginResponse;
  }

  @Post('login')
  async loginUser(
    @Body() userDto: UserDto,
    @Res() res: Response,
  ): Promise<ILoginResponse> {
    const jwt = await this.authService.validateUser(userDto);
    res.setHeader('Authorization', `Bearer ${jwt.accessToken}`);
    return res.json(jwt) as unknown as ILoginResponse;
  }

  @Get('authenticated')
  @UseGuards(MyAuthGuard)
  isAuthenticated(@Req() req: Request): Omit<UserDto, 'password'> {
    const user = req.user as UserDto;
    return {
      email: user.email,
      username: user.username,
    };
  }
}
