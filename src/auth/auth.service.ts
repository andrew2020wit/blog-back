import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginStatus } from 'src/auth/interfaces/LoginStatus';
import { RegistrationStatus } from 'src/auth/interfaces/RegistrationStatus';
import { IJwtPayload } from 'src/auth/strategies/jwt/i-jwt-payload.interface';
import { CreateUserDto } from 'src/auth/users/dto/create-user.dto';
import { LoginUserDto } from 'src/auth/users/dto/login-user.dto';
import { ReturnUserDto } from 'src/auth/users/dto/return-user.dto';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };

    try {
      await this.usersService.create(createUserDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }

    return status;
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    // find user in db
    const user = await this.usersService.findByLogin(loginUserDto);

    // generate and sign token
    const token = this._createToken(user);

    return {
      id: user.id,
      ...token,
    };
  }

  async validateUser(payload: IJwtPayload): Promise<ReturnUserDto> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken({ id }: ReturnUserDto): any {
    const expiresIn = process.env.JWT_EXPIRESIN;

    const user: IJwtPayload = { id };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn,
      accessToken,
    };
  }
}
