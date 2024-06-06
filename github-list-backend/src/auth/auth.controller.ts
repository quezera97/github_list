import { Controller, Post, Body, BadRequestException, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user')
  @UseInterceptors(LoggingInterceptor)
  async login(@Body() loginDto: LoginDto){
    try {
      const user = await this.authService.validateUser(loginDto.email, loginDto.password);
      
      return user;
      
    } catch (error) {
      return null;
    }

  }
}
