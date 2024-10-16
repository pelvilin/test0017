/* eslint-disable prettier/prettier */
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from './../../services/users/users.service';
import { Controller, Get, Post , Body, Put, Param, ParseIntPipe, Delete} from '@nestjs/common';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUserProfile.dto';


@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}
    @Get()
    getUser() {
        return this.userService.findUsers(); 
    }

    @Post()
    createUser(@Body() CreateUserDto: CreateUserDto) {
   return this.userService.createUser(CreateUserDto);
    }
    
   @Put(':id')
   async updateUserById(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Param('id', ParseIntPipe) id : number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() updateUserDto: UpdateUserDto,
 ){
     await this.userService.updateUser(id, updateUserDto);
}

@Delete(':id')
async deleteUserById(@Param('id', ParseIntPipe) id: number){
    await this.userService.deleteUser(id);
}

    @Post(':id/Profiles')
    createUserprofile(
        @Param('id', ParseIntPipe) id: number,
        @Body() createUserProfileDto: CreateUserProfileDto, 
    ){
        return this.createUserprofile(id, createUserProfileDto);

    }
}
