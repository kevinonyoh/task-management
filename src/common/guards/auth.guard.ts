import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService, 
    private reflector: Reflector,
    private configService: ConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();

    const token = request.headers['authorization'];

    const client = request.headers['client'];


    if (!token) throw new UnauthorizedException('Valid token is required');

    if (!client) throw new UnauthorizedException('Client is required');

    if (!['user', 'admin'].includes(client)) throw new UnauthorizedException('Invalid client');

    const _token = token.replace(/(Bearer\s|bearer\s)/, '');
    
   
    const privateKey = this.configService.get<string>('secret');

     
    try {
      const decoded = await this.jwtService.verifyAsync(_token, { secret: privateKey });
   
      request[decoded.client] = decoded;
    } catch (err) {
      if (/Token/.test(err.name)) throw new UnauthorizedException('Invalid token');
      
      throw err;
    }

    return true;
  }
}
