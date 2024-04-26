import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomCreateService } from './room-create.service';
import { CreateRoomCreateDto } from './dto/create-room-create.dto';
import { UpdateRoomCreateDto } from './dto/update-room-create.dto';
import { RoomCreate } from './entities/room-create.entity';

@Controller('room-create')
export class RoomCreateController {
  constructor(private readonly roomCreateService: RoomCreateService) {}

  @Get('test')
  getRoom(): string {
    return this.roomCreateService.getRoom();
  }

  @Post('save')
  async create(@Body() createRoomCreateDto: CreateRoomCreateDto) {
    await this.roomCreateService.save(createRoomCreateDto);
    return Object.assign({
      data: { createRoomCreateDto },
      statusCode: 201,
      statusMsg: `saved successfully`,
    });
  }

  @Get('all')
  async findAll(): Promise<RoomCreate[]> {
    const roomList = await this.roomCreateService.findAll();
    return Object.assign({
      data: roomList,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.roomCreateService.remove(id);
    return Object.assign({
      data: { id },
      statusCode: 201,
      statusMsg: `deleted successfully`,
    });
  }
}
