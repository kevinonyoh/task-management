/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Put, Query } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { AddCommentDto, CreateTodolistDto, DeleteCommentDto, GetDueDateDto, PagnationDto, UpdateCommentDto, UpdateStatusDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { Transaction } from 'sequelize';
import { TransactionParam } from 'src/common/decorators/transaction-param.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { IUser, Status, Tag } from './interfaces/todolist.interface';

@Controller('todolist')
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) {}
  
  
  @Post("create")
  @ResponseMessage("Task added successfully")
  create(@Body() createTodolistDto: CreateTodolistDto, @User() user:IUser, @TransactionParam() transaction: Transaction) {
    return this.todolistService.create(createTodolistDto, user, transaction);
  }

  @Put("update-status/:id")
  @ResponseMessage("todo status update successfully")
  updateStatus(@Param('id') todoId: string, @Body() body: UpdateStatusDto, @User() user: IUser, @TransactionParam() transaction: Transaction){
      return this.todolistService.updateStatus(body, todoId, user, transaction);
  }

  @Post("make-comment")
  @ResponseMessage("comment add successfully")
  addComment(@User() user: IUser, @Body() addCommentDto: AddCommentDto,  @TransactionParam() transaction: Transaction){
      return this.todolistService.addComment(user, addCommentDto, transaction);
  }

  @Get("view-comment/:id")
  @ResponseMessage("comment add successfully")
  viewComment(@Param('id') todoId: string){
     return this.todolistService.viewComments(todoId);
  }

  @Delete("delete-comment")
  @ResponseMessage("comment delete successfully")
  deleteComment(@User() user: IUser, @Body() deleteCommentDto: DeleteCommentDto, @TransactionParam() transaction: Transaction){
    return this.todolistService.deleteComment(user, deleteCommentDto, transaction);
  }

  @Put("edit-comment")
  @ResponseMessage("comment edit successfully")
  updateComment(@User() user: IUser, @Body() updateCommentDto: UpdateCommentDto, @TransactionParam() transaction: Transaction){
      return this.todolistService.updateComment(user, updateCommentDto, transaction);
  }

  @Get("tag/:tag")
  @ResponseMessage("todolist by tag")
  getByTag(@Param("tag") tag:Tag){
    return this.todolistService.findByTag(tag);
  }

  @Get("status/:status")
  @ResponseMessage("todolist by status")
  getByStatus(@Param("status") status:Status){
    return this.todolistService.fingByStatus(status);
  }

  @Get("pagination")
  @ResponseMessage("todolist by pagnation")
  getByPagnation(@Query() query: PagnationDto){
     return this.todolistService.findByPage(query)
  }

  @Get("dueDate")
  @ResponseMessage("todolist by due date")
  getByDueDate(@Query() query: GetDueDateDto){
    return this.todolistService.findByDueDate(query);
  }

  @Delete("todo/:id")
  @ResponseMessage("todo deleted successfully")
  remove(@Param("id") todoId: string, @User() user: IUser, @TransactionParam() transaction: Transaction){
    return this.todolistService.remove(todoId, user, transaction);
  }

 }
