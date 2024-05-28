import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user')
  async login(@Body() loginDto: LoginDto): Promise<UserEntity | null> {
    try {
      const user = await this.authService.validateUser(loginDto.email, loginDto.password);
      
      return user;
      
    } catch (error) {
      return null;
    }

  }
}
