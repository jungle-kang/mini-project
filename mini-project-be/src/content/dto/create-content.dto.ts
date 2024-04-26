import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateContentDto {
    @IsNotEmpty()
    @IsString()
    text: string;

    @IsNotEmpty()
    @IsNumber()
    roomId: number;
}
