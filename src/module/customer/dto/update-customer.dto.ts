import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsIn } from 'class-validator';

export class UpdateCustomerDto {
    @ApiProperty({ example: 'John Doe', description: 'Customer name', required: false })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ example: 'john@example.com', description: 'Customer email', required: false })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({
        example: '+998901234567',
        description: 'Customer phone number',
        required: false,
    })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({ example: 'Acme Inc.', description: 'Customer company name', required: false })
    @IsOptional()
    @IsString()
    company?: string;

    @ApiProperty({
        example: 'active',
        description: 'Customer status',
        enum: ['active', 'potential', 'waiting'],
        required: false,
    })
    @IsOptional()
    @IsIn(['active', 'potential', 'waiting'])
    status?: 'active' | 'potential' | 'waiting';

    @ApiProperty({ example: 'High', description: 'Customer value', required: false })
    @IsOptional()
    @IsString()
    value?: string;
}
