import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
    @IsEmail()
    @ApiProperty({ example: 'user@example.com', description: 'Email address' })
    email: string;

    @IsString()
    @ApiProperty({ example: 'password123', description: 'User password' })
    password: string;
}
