

/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AdminService } from 'src/admin/admin.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly adminService: AdminService
    ) {}

  async login(data: LoginDto) {
       const {email} = data;
      
       const user = await this.userService.getUserByEmail(email);

       if(!user) throw new UnauthorizedException("This user does not exist");

      const val = bcrypt.compareSync(data?.password, user.password);

      if(!val) throw new UnauthorizedException("Incorrect password");

      const secret = this.configService.get<string>('secret');

      const accessToken = await this.jwtService.signAsync({ id: user.id, email, client: "user" }, {secret});
      
     const {password, ...rest} = user.toJSON();
     
      return { ...rest, accessToken }
  }

  async loginAsAdmin(data: LoginDto){
        const {email} = data;
          
        const user = await this.adminService.getAdminByEmail(email);

        if(!user) throw new UnauthorizedException("This user does not exist");

        const val = bcrypt.compareSync(data?.password, user.password);

        if(!val) throw new UnauthorizedException("Incorrect password");

        const secret = this.configService.get<string>('secret');

        const accessToken = await this.jwtService.signAsync({ id: user.id, email, client: "admin"}, {secret});

        const {password, ...rest} = user.toJSON();

        return { ...rest, accessToken }
  }
}