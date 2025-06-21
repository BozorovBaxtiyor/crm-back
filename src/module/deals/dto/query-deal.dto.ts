import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class QueryDealDto {
    @ApiProperty({ description: 'Page number', default: 1, required: false })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiProperty({ description: 'Items per page', default: 10, required: false })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number = 10;

    @ApiProperty({
        description: 'Deal status',
        enum: ['new', 'in_progress', 'completed', 'cancelled'],
        required: false,
    })
    @IsOptional()
    @IsIn(['new', 'in_progress', 'completed', 'cancelled'])
    status?: 'new' | 'in_progress' | 'completed' | 'cancelled';

    @ApiProperty({ description: 'Customer ID', required: false })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    customerId?: number;
}
