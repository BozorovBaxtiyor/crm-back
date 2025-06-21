import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateActivityDto {
    @ApiProperty({
        example: 'call',
        description: 'Type of activity',
        enum: ['call', 'email', 'meeting', 'deal'],
    })
    @IsNotEmpty()
    @IsIn(['call', 'email', 'meeting', 'deal'])
    type: 'call' | 'email' | 'meeting' | 'deal';

    @ApiProperty({
        example: 'Called customer to discuss the new proposal',
        description: 'Description of the activity',
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        example: 1,
        description: 'ID of the customer associated with this activity',
    })
    @IsNotEmpty()
    @IsNumber()
    customerId: number;
}
