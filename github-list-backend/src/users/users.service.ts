import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    ) { }

    async getUsers() {
        return this.userRepository.find();
    }

    async getUserById(id: number): Promise<UserEntity | null> {
        return this.userRepository.findOne({ where: { id } });
    }

    async createUser(userDetails: CreateUserParams) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userDetails.password, salt);

        userDetails.password = hashedPassword;

        const newUser = this.userRepository.create({ ...userDetails, created_at: new Date() });

        return this.userRepository.save(newUser);
    }

    async updateUser(id: number, updateUserDetails: UpdateUserParams) {
        return this.userRepository.update({ id }, { ...updateUserDetails })
    }

    async deleteUser(id: number) {
        return this.userRepository.delete(id)
    }
}