import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntitiy } from 'src/typeorm/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntitiy) private usersRepository: Repository<UserEntitiy>,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntitiy | null> {
    const user = await this.usersRepository.findOne({ where: { email, password } });
    
    return user || null;
  }
}
