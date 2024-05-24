import { PartialType } from '@nestjs/mapped-types';
import { CreateGithubRepoDto } from './create-github-repo.dto';

export class UpdateGithubRepoDto extends PartialType(CreateGithubRepoDto) {
    repository: string;
    description: string;
    meta: string;
}
