
import { IsNotEmpty, IsOptional, IsString, IsStrongPassword } from 'class-validator';


export class UpdateAdminDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsStrongPassword()
    @IsOptional()
    password: string;
}