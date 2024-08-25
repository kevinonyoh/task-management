/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() Body: CreateAuthDto) {
    return this.authService.login(Body);
  }

  @Post("login-as-admin")
  loginAsAdmin(@Body() Body: CreateAuthDto) {
    return this.authService.loginAsAdmin(Body);
  }


}