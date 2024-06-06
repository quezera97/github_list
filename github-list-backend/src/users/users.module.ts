// In the imports array we call TypeOrmModule.forFeature to integrate our entity file.

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ModifyUsernameInterceptor } from './interceptors/modify-username.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, ModifyUsernameInterceptor]
})
export class UsersModule { }