import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AddCommentDto, AdminAssignTodolistDto, CreateAdminDto, DeleteCommentDto, UpdateStatusTaskDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { IAdmin } from './interfaces/admin.interface';
import { Admin } from 'src/common/decorators/admin.decorator';
import { TransactionParam } from 'src/common/decorators/transaction-param.decorator';
import { Transaction } from 'sequelize';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { Public } from 'src/common/decorators/public.decorator';


@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post("register")
  @ResponseMessage("Admin registered successfully")
  create(@Admin() admin:IAdmin, @Body() createAdminDto: CreateAdminDto, @TransactionParam() transaction: Transaction) {
     return this.adminService.createAdmin(createAdminDto, transaction);
  }

  @Put("update-details")
  @ResponseMessage("Admin details updated successfully")
  updateAdminDetails(@Admin() admin:IAdmin, @Body() updateAdminDto: UpdateAdminDto,  @TransactionParam() transaction: Transaction){
     return this.adminService.updateAdmin(admin, updateAdminDto, transaction)
  }

 
  @Post("task-assign-by-admin")
  @ResponseMessage("Task assign successfully")
  assignUserTask(@Admin() admin:IAdmin, @Body() adminAssignTodolistDto:AdminAssignTodolistDto, @TransactionParam() transaction: Transaction){
     return this.adminService.assignUserTask(admin, adminAssignTodolistDto, transaction);
  }

  @Put("update-task-status/:id")
  @ResponseMessage("todo status updated successfully")
  updateStatus(@Admin() admin:IAdmin, @Param("id") id: string, @Body() updateStatusTaskDto:UpdateStatusTaskDto, @TransactionParam() transaction: Transaction){
     return this.adminService.updateStatusTask(admin, id, updateStatusTaskDto, transaction);
  }

  @Post("add-comment-by-admin")
  @ResponseMessage("comment added successfully")
  addComment(@Admin() admin:IAdmin, @Body() addCommentDto:AddCommentDto, @TransactionParam() transaction: Transaction){
    return this.adminService.addComment(admin, addCommentDto, transaction);
  }

  @Delete("delete-comment")
  @ResponseMessage("comment delete successfully")
  deleteComment(@Body() deleteCommentDto: DeleteCommentDto, @TransactionParam() transaction: Transaction){
      return this.adminService.deleteComment(deleteCommentDto, transaction);
  }

}
