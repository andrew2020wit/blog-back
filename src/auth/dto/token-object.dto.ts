import { JwtUserDto } from './jwt-user.dto';

export class JWTokenDTO extends JwtUserDto {
  token: string;
}
