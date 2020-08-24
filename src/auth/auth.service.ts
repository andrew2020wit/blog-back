import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenObject } from 'src/interfaces/token-object';
import { UserEntity } from 'src/users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(login: string, pass: string): Promise<UserEntity | null> {
    const user = await this.usersService.findOne(login);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async login(user: UserEntity): Promise<TokenObject> {
    const payload = { username: user.login, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
