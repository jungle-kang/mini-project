import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class createRoomDto {
    @ApiProperty({ description: '방 제목' })
    @IsNotEmpty() // 데이터 유효성 검사 - validation pipe
    titles: string;
}