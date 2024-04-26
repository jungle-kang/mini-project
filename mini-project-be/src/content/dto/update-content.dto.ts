import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateContentDto {
    @ApiProperty({ description: 'content 내용' })
    @IsString()
    text: string;
}
