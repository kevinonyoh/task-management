/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Transaction } from 'sequelize';
import { UserRepository } from './repositories/user.repository';
import * as bcrypt from "bcrypt";
import { ICreateUser } from './interfaces/user.interface';
import { NotificationRepository } from './repositories/notification.repository';
import { IUser } from 'src/todolist/interfaces/todolist.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly notificationRepository: NotificationRepository){}
  
  async create(data: CreateUserDto, transaction: Transaction) {

     const {email, name, password} = data;
     const userExist = await this.getUserByEmail(email);
     
     if(!!userExist) throw new BadRequestException("User email already exist");  

     const salt = await bcrypt.genSalt();

     const hashPassword = await bcrypt.hash(password, salt);
     
     const payload: ICreateUser = {
      email,
      name,
      password: hashPassword
     }

     await this.userRepository.create(payload, transaction);
  
   }
  

  async getUserByEmail(email: string){
     
     return  await this.userRepository.findOne({ email });
  }

  async getUserNotification(user: IUser){
     return await this.notificationRepository.findAll({userId: user.id});
  }

  
}
