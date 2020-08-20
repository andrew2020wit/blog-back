export class CreateUserDto {
  login: string;
  password: string;
  name: string;
  role: string;
  isBanned: boolean;
}
