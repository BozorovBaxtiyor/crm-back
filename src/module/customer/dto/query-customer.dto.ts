import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class QueryCustomerDto {
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

    @ApiProperty({ description: 'Search term', required: false })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiProperty({
        description: 'Customer status',
        enum: ['active', 'potential', 'waiting'],
        required: false,
    })
    @IsOptional()
    @IsIn(['active', 'potential', 'waiting'])
    status?: 'active' | 'potential' | 'waiting';
}
