import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntitiy } from 'src/typeorm/entities/user.entity';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntitiy) private userRepository: Repository<UserEntitiy>,
    ) { }

    getUsers() {
        return this.userRepository.find();
    }

    getUserById(id: number): Promise<UserEntitiy | null> {
        return this.userRepository.findOne({ where: { id } });
    }

    createUser(userDetails: CreateUserParams) {
        const newUser = this.userRepository.create({ ...userDetails, created_at: new Date() });
        return this.userRepository.save(newUser);
    }

    updateUser(id: number, updateUserDetails: UpdateUserParams) {
        return this.userRepository.update({ id }, { ...updateUserDetails })
    }

    deleteUser(id: number) {
        return this.userRepository.delete(id)
    }
}