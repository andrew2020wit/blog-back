import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtPayloadExtDto } from '../dto/jwt-payload-ext.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secretOrKey: '111',
      secretOrKey: process.env.JWT_SECRETKEY,
    });
  }

  async validate(payload: JwtPayloadExtDto): Promise<JwtPayloadExtDto> {
    // console.log(payload);
    return payload;
  }
}
