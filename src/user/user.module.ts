/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserModel } from './models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRepository } from './repositories/user.repository';
import { NotificationModel } from './models/notification.model';
import { NotificationRepository } from './repositories/notification.repository';

@Module({
  imports: [SequelizeModule.forFeature([UserModel, NotificationModel])],
  controllers: [UserController],
  providers: [UserService, UserRepository, NotificationRepository],
  exports: [UserService, NotificationRepository]
})

export class UserModule {}
