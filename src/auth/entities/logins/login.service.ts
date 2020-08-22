import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginObject } from './login.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(LoginObject)
    private readonly usersRepository: Repository<LoginObject>,
  ) {}

  findOne(id: string): Promise<LoginObject> {
    return this.usersRepository.findOne(id);
  }
}
