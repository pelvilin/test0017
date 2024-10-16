/* eslint-disable prettier/prettier */
import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { User} from '../../../typeorm/entities/user';
import { Repository } from 'typeorm';
import { CreateUserParams,
         CreateUserProfileParams,
        UpdateUserParams,
       } from '../../../utils/types';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { Profile } from 'src/typeorm/entities/Profile';

 
@Injectable()
export class UsersService {
    deleteUser: any;
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

    findUsers()  {
      return  this.userRepository.find()
    }
 
   createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
        ...userDetails,
        createdAt: new Date(),
   }  );
    return this.userRepository.save(newUser);
   }

   updateUser(id: number, updateUserDetails: UpdateUserDto) {
   return this.userRepository.update({id }, {...updateUserDetails});

   async createUserProfileDto(
    id: Number, 
    createUserprofileDetails: CreateUserProfileParams){}
   }{
    const user = await this.userRepository.findOneBy({ id }) ;
    if( !user) throw new HttpException( 
      'User not found. Cannot create Profile', 
      HttpStatus.BAD_REQUEST,

    )
    const newProfile = this.profileRepository.create(createUserProfileDetails);
    const savedprofile = await this.profileRepository.save(newProfile); 
    user.profole = savedprofile; 
    return this.userRepository.save(user);
   }
}


