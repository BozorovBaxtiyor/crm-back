import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDealDto {
    @ApiProperty({ example: 'New software agreement', description: 'Deal title' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        example: 'Implementation of new CRM system',
        description: 'Deal description',
        required: false,
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: 5000, description: 'Deal value', required: false })
    @IsOptional()
    @IsNumber()
    value?: number;

    @ApiProperty({
        example: 'new',
        description: 'Deal status',
        enum: ['new', 'in_progress', 'completed', 'cancelled'],
        default: 'new',
    })
    @IsOptional()
    @IsIn(['new', 'in_progress', 'completed', 'cancelled'])
    status?: 'new' | 'in_progress' | 'completed' | 'cancelled';

    @ApiProperty({ example: 1, description: 'Customer ID' })
    @IsNotEmpty()
    @IsNumber()
    customerId: number;
}
