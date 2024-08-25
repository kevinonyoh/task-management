/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AddCommentDto, CreateTodolistDto, DeleteCommentDto, GetDueDateDto, PagnationDto, UpdateCommentDto, UpdateStatusDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import {TodolistRepository} from './repositories/todolist.repository'
import { Transaction } from 'sequelize';
import { filter } from 'rxjs';
import { IUser, Status, Tag } from './interfaces/todolist.interface';
import { TaskCommentRepository } from './repositories/taskComment.repository';
import { NotificationRepository } from 'src/user/repositories/notification.repository';

@Injectable()
export class TodolistService {
  constructor(
    private readonly todolistRepository: TodolistRepository,
    private readonly taskCommentRepository: TaskCommentRepository,
    private readonly  notificationRepository: NotificationRepository
    ){}
 async create(createTodolistDto: CreateTodolistDto, data:IUser, transaction: Transaction) {

     const {...rest} = createTodolistDto;
     const payload = {
      assignBy: data.id,
      ...rest
     }

    await this.todolistRepository.create(payload, transaction);

    const val = {
    message: `you assign ${createTodolistDto.taskName} to yourself`,
    userId: data.id
    }
   await this.notificationRepository.create(val, transaction);
  }


  async updateStatus(data: UpdateStatusDto, id: string, user:IUser, transaction: Transaction){

    const val = {
      message: `your status was updated by you`,
      userId: user.id
      }
      await this.notificationRepository.create(val, transaction);

    return await this.todolistRepository.update({id, assignTo: user.id}, {...data}, transaction);
  }

  async remove(id: string, data: IUser, transaction: Transaction){
    return await this.todolistRepository.delete({id, assignTo: data.id}, transaction)
  }

  async addComment(user: IUser, data: AddCommentDto, transaction: Transaction){
        
    const payload = {
      userEmail: user.email,
      ...data
    }

    await this.taskCommentRepository.create(payload, transaction);
  }

  async viewComments(id: string){
     return await this.taskCommentRepository.findAll({todoId: id});
  }

  async deleteComment(user: IUser, data:DeleteCommentDto, transaction: Transaction){

    await this.taskCommentRepository.delete({userEmail: user.email, id: data.id}, transaction);

  }

  async updateComment(user: IUser, data: UpdateCommentDto, transaction: Transaction){
      
       const {todoId, id, comment} = data
       
       const filter = {
        todoId,
        id,
        userEmail: user.email
        }

       return await this.taskCommentRepository.update(filter, {comment}, transaction);

  }

  async findByTag(tag: Tag){
     return await this.todolistRepository.findAll({tag});
  }

  async fingByStatus(status: Status){
     return await this.todolistRepository.findAll({status});
  }

  async findByPage(data: PagnationDto){
     return await this.todolistRepository.findAllPaginated({}, {}, data);
  }

  async findByDueDate(data: GetDueDateDto){
    return await this.todolistRepository.findAll({...data});
  }
  
}


