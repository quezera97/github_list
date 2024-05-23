import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import { UsersService } from './users.service';
import { UserEntitiy } from 'src/typeorm/entities/user.entity';
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }

    @Get()
    async getUsers() {
        return this.userService.getUsers();
    }

    @Get(':id') 
    async getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserEntitiy | null> {
        return this.userService.getUserById(id);
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntitiy | null> {
        return this.userService.createUser(createUserDto);
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