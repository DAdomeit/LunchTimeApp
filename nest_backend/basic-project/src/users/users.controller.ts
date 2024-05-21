import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/Create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    async getAllUsers() {
        const users = await this.userService.getAllUsers();
        return users;
    }

    @Get(':userId')
    async getUser(@Param('userId') userId) {
        const user = await this.userService.getUser(userId);
        return user;
    }

    @Post()
    async addUser(@Body() createUserDTO: CreateUserDTO) {
        const user = await this.userService.addUser(createUserDTO);
        return user;
    }

    @Post('update')
    async updateUser(@Body() createUserDTO: CreateUserDTO) {
        const users = await this.userService.updateUser(createUserDTO);
        return users;
    }

    @Delete()
    async deleteUser(@Query() query) {
        const user = await this.userService.deleteUser(query.userId);
        return user;
    }
}
