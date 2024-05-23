import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'github_repo' })
export class UserEntity {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ unique: true })
    repository: string;

    @Column()
    description: string;

    @Column()
    meta: string;

    @Column()
    created_at: Date;
}