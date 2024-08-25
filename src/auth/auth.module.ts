import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [UserModule, JwtModule, AdminModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}