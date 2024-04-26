import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateContentDto {
    @ApiProperty({ description: 'content 내용' })
    @IsNotEmpty()
    @IsString()
    text: string;

    @ApiProperty({ description: 'rooId' })
    @IsNotEmpty()
    @IsNumber()
    roomId: number;
}
