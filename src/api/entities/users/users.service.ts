import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // create(createUserDto: CreateUserDto): Promise<User> {
  //   const user = new User();
  //   user.name = createUserDto.name;
  //   user.login = createUserDto.login;
  //   user.password = createUserDto.password;
  //   user.role = 'user';
  //   user.isBanned = false;
  //   return this.usersRepository.save(user);
  // }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // findOne(id: string): Promise<User> {
  //   return this.usersRepository.findOne(id);
  // }

  // async remove(id: string): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }
}
