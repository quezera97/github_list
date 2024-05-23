import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntitiy } from 'src/typeorm/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntitiy])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
