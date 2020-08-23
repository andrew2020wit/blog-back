import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from './login.controller';
import { LoginObject } from './login.entity';
import { LoginService } from './login.service';

@Module({
  imports: [TypeOrmModule.forFeature([LoginObject])],
  providers: [LoginService],
  controllers: [LoginController],
})
export class AuthModule {}
