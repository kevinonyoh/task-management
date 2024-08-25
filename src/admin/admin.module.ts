import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModel } from './models/admin.model';
import { AdminRepository } from './repositories/admin.repository';
import { TodolistModule } from 'src/todolist/todolist.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [SequelizeModule.forFeature([AdminModel]), TodolistModule, UserModule],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository],
  exports: [AdminService]
})
export class AdminModule {}
