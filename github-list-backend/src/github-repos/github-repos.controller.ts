import { Controller, Get, Post, Body, Patch, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { GithubReposService } from './github-repos.service';
import { CreateGithubRepoDto } from './dto/create-github-repo.dto';
import { UpdateGithubRepoDto } from './dto/update-github-repo.dto';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';

@Controller('github-repos')
export class GithubReposController {
  constructor(private readonly githubReposService: GithubReposService) {}

  @Post('create')
  async create(@Body() createGithubRepoDto: CreateGithubRepoDto) {
    return await this.githubReposService.create(createGithubRepoDto);
  }

  @Get('all')
  @UseGuards(ThrottlerGuard)
  // @Throttle({ default: { limit: 3, ttl: 60000 } }) to override
  async findAll() {
    return await this.githubReposService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.githubReposService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateGithubRepoDto: UpdateGithubRepoDto) {
    return await this.githubReposService.update(+id, updateGithubRepoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.githubReposService.remove(+id);
  }
}
