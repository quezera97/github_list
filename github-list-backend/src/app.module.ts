import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserEntitiy } from './typeorm/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';


const appEntities = [UserEntitiy];
const appModules = [UsersModule, AuthModule];
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'github_list',
      entities: appEntities,
      // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
      synchronize: true,
    }), ...appModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
