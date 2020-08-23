import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLoginObjectDto } from './dto/create-login.dto';
import { LoginObject } from './login.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(LoginObject)
    private readonly loginRepository: Repository<LoginObject>,
  ) {}

  create(newLogin: CreateLoginObjectDto): Promise<LoginObject> {
    const loginObject = new LoginObject();
    loginObject.login = newLogin.login;
    loginObject.password = newLogin.password;
    return this.loginRepository.save(loginObject);
  }
}
