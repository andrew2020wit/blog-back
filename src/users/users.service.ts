import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  create(newUser: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity();
    user.login = newUser.login;
    user.password = newUser.password;
    return this.userRepository.save(user);
  }

  async findOne(login: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ login: login });
    return user;
  }
}
