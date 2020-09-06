import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthAdminController } from './admin.controller';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAdminStrategy } from './strategies/jwt-admin.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PassportModule.register({
      // defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    UsersModule,
    JwtModule.register({
      //secret: '111',
      secret: process.env.JWT_SECRETKEY,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRESIN,
      },
    }),
  ],
  providers: [JwtAdminStrategy, JwtStrategy, LocalStrategy, AuthService],
  controllers: [AuthController, AuthAdminController],
  exports: [AuthService, PassportModule, JwtModule],
})
export class AuthModule {}
