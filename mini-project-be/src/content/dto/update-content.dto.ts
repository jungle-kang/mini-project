import { IsString } from 'class-validator';

export class UpdateContentDto {
    @IsString()
    text: string;
}
