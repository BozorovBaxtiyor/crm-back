import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
    @IsEmail()
    @ApiProperty({ example: 'example@gmail.com', description: 'Email address' })
    email: string;

    @IsString()
    @ApiProperty({ example: 'StrongPassword', description: 'User password' })
    password: string;
}
