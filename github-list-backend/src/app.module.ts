import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserEntity } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GithubRepoEntity } from './github-repos/entities/github-repo.entity';
import { GithubReposModule } from './github-repos/github-repos.module';
import { ThrottlerModule } from '@nestjs/throttler';


const appEntities = [UserEntity, GithubRepoEntity];
const appModules = [UsersModule, AuthModule, GithubReposModule];
@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
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
