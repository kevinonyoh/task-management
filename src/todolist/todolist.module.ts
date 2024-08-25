import { Module } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { TodolistController } from './todolist.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { todolistModel } from './models/todolist.model';
import { TodolistRepository } from './repositories/todolist.repository';
import { TaskCommentRepository } from './repositories/taskComment.repository';
import { TaskCommentModel } from './models/taskComment.model';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [SequelizeModule.forFeature([todolistModel, TaskCommentModel]), UserModule],
  controllers: [TodolistController],
  providers: [TodolistService, TodolistRepository, TaskCommentRepository],
  exports: [TodolistRepository, TaskCommentRepository]
})
export class TodolistModule {}
