import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Min, Max } from 'class-validator';

export class QueryActivityDto {
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
        description: 'Type of activity',
        enum: ['call', 'email', 'meeting', 'deal'],
        required: false,
    })
    @IsOptional()
    @IsIn(['call', 'email', 'meeting', 'deal'])
    type?: 'call' | 'email' | 'meeting' | 'deal';

    @ApiProperty({ description: 'Customer ID', required: false })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    customerId?: number;
}
