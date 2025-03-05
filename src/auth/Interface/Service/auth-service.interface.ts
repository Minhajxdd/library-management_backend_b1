import { RegisterDto } from '../../Dto/register.dto';

export interface IAuthService {
  register(registerData: RegisterDto, res: Response): Promise<void>;
}
