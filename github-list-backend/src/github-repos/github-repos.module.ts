import { Module } from '@nestjs/common';
import { GithubReposService } from './github-repos.service';
import { GithubReposController } from './github-repos.controller';
import { GithubRepoEntity } from './entities/github-repo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GithubRepoEntity])],
  controllers: [GithubReposController],
  providers: [GithubReposService],
})

export class GithubReposModule {}
