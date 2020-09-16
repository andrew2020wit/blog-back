import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AuthorsResolver,
  UsersCountResolver,
} from './graphql/authors.resolver';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService, AuthorsResolver, UsersCountResolver],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
