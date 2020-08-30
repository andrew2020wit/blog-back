import { JwtUserDto } from '../dto/jwt-user.dto';

export interface RequestWithJwtUserDto extends Request {
  user?: JwtUserDto;
}
