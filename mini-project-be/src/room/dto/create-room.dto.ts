import { IsNotEmpty } from "class-validator";

export class createRoomDto {
    @IsNotEmpty() // 데이터 유효성 검사 - validation pipe
    titles: string;
}