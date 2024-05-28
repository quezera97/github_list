import { Injectable } from '@nestjs/common';
import { CreateGithubRepoDto } from './dto/create-github-repo.dto';
import { UpdateGithubRepoDto } from './dto/update-github-repo.dto';
import { GithubRepoEntity } from './entities/github-repo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GithubReposService {

  constructor(
    @InjectRepository(GithubRepoEntity) private githubRepository: Repository<GithubRepoEntity>,
  ) { }

  async create(createGithubRepoDto: CreateGithubRepoDto): Promise<GithubRepoEntity> {
    const newRepo = this.githubRepository.create({ ...createGithubRepoDto, created_at: new Date() });
    return await this.githubRepository.save(newRepo);
  }

  async findAll(): Promise<GithubRepoEntity[]> {
    return await this.githubRepository.find();
  }

  async findOne(id: number): Promise<GithubRepoEntity | null> {
    return await this.githubRepository.findOne({ where: { id } });
  }

  async update(id: number, updateGithubRepoDto: UpdateGithubRepoDto): Promise<GithubRepoEntity> {
    await this.githubRepository.update(id, updateGithubRepoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await await this.githubRepository.delete(id);
  }
}
