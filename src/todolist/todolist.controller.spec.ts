import { Test, TestingModule } from '@nestjs/testing';
import { TodolistController } from './todolist.controller';
import { TodolistService } from './todolist.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { todolistModel } from './models/todolist.model';
import { TaskCommentModel } from './models/taskComment.model';
import { UserModule } from 'src/user/user.module';
import { TodolistRepository } from './repositories/todolist.repository';
import { TaskCommentRepository } from './repositories/taskComment.repository';

describe('TodolistController', () => {
  let controller: TodolistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SequelizeModule.forFeature([todolistModel, TaskCommentModel]), UserModule],
      controllers: [TodolistController],
      providers: [TodolistService, TodolistRepository, TaskCommentRepository],
      exports: [TodolistRepository, TaskCommentRepository]
    }).compile();

    controller = module.get<TodolistController>(TodolistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
