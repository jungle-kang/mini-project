import { PartialType } from '@nestjs/swagger';
import { CreateRoomCreateDto } from './create-room-create.dto';

export class UpdateRoomCreateDto extends PartialType(CreateRoomCreateDto) {
  titles?: string; // ?를 사용하여 선택적 필드임을 표시
}
