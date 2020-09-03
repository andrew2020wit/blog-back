import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAdminView } from './dto/user-admin-view.dto';
import { AdminJwtAuthGuard } from './guards/admin-jwt-auth.guard';
import { UsersService } from './users/users.service';

@Controller('api/auth/admin')
export class AuthAdminController {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Get('users')
  @UseGuards(AdminJwtAuthGuard)
  async usersList(): Promise<UserAdminView[] | undefined> {
    return await this.usersService.findAllUsersWithOutPW();
  }
}
