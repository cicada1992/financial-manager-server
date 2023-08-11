import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { ISecurityPayload } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_KEY,
    });
  }

  async validate(
    payload: ISecurityPayload,
    done: VerifiedCallback,
  ): Promise<void> {
    const user = await this.authService.validateToken(payload);
    if (!user) {
      return done(new UnauthorizedException({ message: 'user not found' }));
    }
    return done(null, user);
  }
}
