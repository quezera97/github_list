import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'github_repo' })
export class GithubRepoEntity {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ unique: true })
    repository: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    meta: string;

    @Column()
    created_at: Date;
}