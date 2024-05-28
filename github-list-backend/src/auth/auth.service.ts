import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity | null> {

    try {
      const user = await this.usersRepository.findOne({ where: { email } });
      
      const hashedPassword = user.password;
      
      const isMatch = await bcrypt.compare(password, hashedPassword);
  
      if(!isMatch){
        return null;
      }
      
      return user || null;
    } catch (error) {
      return null;
    }

  }
}
