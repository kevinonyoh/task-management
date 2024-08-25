import { BadRequestException, Injectable } from '@nestjs/common';
import { AddCommentDto, AdminAssignTodolistDto, CreateAdminDto, DeleteCommentDto, UpdateStatusTaskDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { IAdmin } from './interfaces/admin.interface';
import { Transaction } from 'sequelize';
import * as bcrypt from "bcrypt";
import { AdminRepository } from './repositories/admin.repository';
import { TodolistRepository } from 'src/todolist/repositories/todolist.repository';
import { TaskCommentRepository } from 'src/todolist/repositories/taskComment.repository';
import { NotificationRepository } from 'src/user/repositories/notification.repository';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly todolistRepository: TodolistRepository,
    private readonly taskCommentRepository: TaskCommentRepository,
    private readonly  notificationRepository: NotificationRepository
  ){}

  async createAdmin(data: CreateAdminDto, transaction: Transaction) {
    const {email, name, password} = data;

    const adminExist = await this.adminRepository.findOne({email});

    if(!!adminExist) throw new BadRequestException("Email already exist");

    const salt = await bcrypt.genSalt();


    const hashPassword = await bcrypt.hash(password, salt);
    
    const payload = {
     email,
     name,
     password: hashPassword
    }

    await this.adminRepository.create(payload, transaction);


  }

  async updateAdmin(admin: IAdmin,updateAdminDto: UpdateAdminDto, transaction: Transaction){

    const {password, ...rest} = updateAdminDto;

    const salt = await bcrypt.genSalt();

    const hashPassword = await bcrypt.hash(password, salt);
    
    const payload = {
     ...rest,
     password: hashPassword
    }

     await this.adminRepository.update({email: admin.email},payload, transaction);
  }

  async assignUserTask(admin: IAdmin, data: AdminAssignTodolistDto, transaction: Transaction){

      const payload = {
        assignBy: admin.id,
        ...data
      }
       
      await this.todolistRepository.create(payload, transaction);
      
      const val = {
         message: `${admin.email} assign ${data.taskName} to you`,
         userId: data.assignTo
      }
      await this.notificationRepository.create(val, transaction);
  }

  async updateStatusTask(admin: IAdmin, id: string, data: UpdateStatusTaskDto, transaction: Transaction){
      
    const {assignTo, status} = data;

    await this.todolistRepository.update({assignBy: admin.id, id}, {status}, transaction);

    const val = {
      message: `${admin.email} update your status`,
      userId: assignTo
    }

    await this.notificationRepository.create(val, transaction);
    
  }

  async addComment(admin: IAdmin, data: AddCommentDto, transaction: Transaction){
        
    const payload = {
      userEmail: admin.email,
      ...data
    }

     await this.taskCommentRepository.create(payload, transaction);
  }

  async deleteComment(data:DeleteCommentDto, transaction: Transaction){

    await this.taskCommentRepository.delete({...data}, transaction);

  }


  async getAdminByEmail(email: string){
     
    return  await this.adminRepository.findOne({ email });
 }

}
