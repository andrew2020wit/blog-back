import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toReturnUserDto } from 'src/auth/mappers/to-user.dto';
import { comparePasswords } from 'src/shared/utils';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(options?: object): Promise<ReturnUserDto> {
    const user = await this.userRepository.findOne(options);
    return toReturnUserDto(user);
  }

  async findByLogin({ login, password }: LoginUserDto): Promise<ReturnUserDto> {
    const user = await this.userRepository.findOne({ where: { login } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return toReturnUserDto(user);
  }

  async findByPayload({ login }: any): Promise<ReturnUserDto> {
    return await this.findOne({ where: { login } });
  }

  async create(userDto: CreateUserDto): Promise<ReturnUserDto> {
    const { login, password } = userDto;

    // check if the user exists in the db
    const userInDb = await this.userRepository.findOne({ where: { login } });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: UserEntity = await this.userRepository.create({
      login,
      password,
    });

    await this.userRepository.save(user);

    return toReturnUserDto(user);
  }

  private _sanitizeUser(user: UserEntity) {
    delete user.password;
    return user;
  }
}
