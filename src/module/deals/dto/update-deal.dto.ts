import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDealDto {
    @ApiProperty({
        example: 'Updated software agreement',
        description: 'Deal title',
        required: false,
    })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({
        example: 'Implementation of new CRM system with extended support',
        description: 'Deal description',
        required: false,
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: 7500, description: 'Deal value', required: false })
    @IsOptional()
    @IsNumber()
    value?: number;

    @ApiProperty({
        example: 'in_progress',
        description: 'Deal status',
        enum: ['new', 'in_progress', 'completed', 'cancelled'],
        required: false,
    })
    @IsOptional()
    @IsIn(['new', 'in_progress', 'completed', 'cancelled'])
    status?: 'new' | 'in_progress' | 'completed' | 'cancelled';

    @ApiProperty({ example: 2, description: 'Customer ID', required: false })
    @IsOptional()
    @IsNumber()
    customerId?: number;
}
