import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { ModifyUsernameInterceptor } from './interceptors/modify-username.interceptor';
@Controller('users')
@UseInterceptors(ModifyUsernameInterceptor)
export class UsersController {

    constructor(private userService: UsersService) { }

    @Get()
    async getUsers() {
        return this.userService.getUsers();
    }

    @Get(':id') 
    async getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserEntity | null> {
        return this.userService.getUserById(id);
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<object> {

        try {
            await this.userService.createUser(createUserDto);
            
            return {
                status: 'success',
                message: 'User successfully created',
            }
        } catch (error) {
            return {
                status: 'error',
                message: error.message || 'Error in creating user',
            }
        }
    }

    @Put(':id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        await this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        await this.userService.deleteUser(id);
    }
}