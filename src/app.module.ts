/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { appProvider } from './common/app.provider';
import { ConfigsModule } from './common/configs/configs.module';
import { DatabaseModule } from './shared/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { TodolistModule } from './todolist/todolist.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [ConfigsModule, DatabaseModule, JwtModule, AuthModule, UserModule, TodolistModule, AdminModule],
  controllers: [AppController],
  providers: [AppService, ...appProvider],
})
export class AppModule {}
