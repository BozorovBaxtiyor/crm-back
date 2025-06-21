import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsIn, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class QuerySalesDto {
    @ApiProperty({
        description: 'Start date (YYYY-MM-DD)',
        example: '2025-01-01',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    startDate?: string;

    @ApiProperty({
        description: 'End date (YYYY-MM-DD)',
        example: '2025-06-30',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    endDate?: string;

    @ApiProperty({
        description: 'Period for grouping data',
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        default: 'monthly',
        required: false,
    })
    @IsOptional()
    @IsIn(['daily', 'weekly', 'monthly', 'yearly'])
    period?: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly';
}
