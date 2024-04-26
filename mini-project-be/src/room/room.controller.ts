import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './room.entity';
import { createRoomDto } from './dto/create-room.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('rooms')
@Controller('rooms')
export class RoomController {
    constructor(private readonly roomService: RoomService) { }

    @Post('/')
    @ApiOperation({
        summary: '방 생성',
        description: '방 생성 API'
    }) // api 설명
    createRoom(@Body() createRoomDto: createRoomDto): Promise<Room> {
        return this.roomService.createRoom(createRoomDto);
    }

    @Get('/')
    @ApiOperation({
        summary: '방 목록 조회',
        description: '방 목록 조회 API'
    })
    getAllRooms(): Promise<Room[]> {
        return this.roomService.getAllRooms();
    }

    @Delete('/:id')
    @ApiOperation({
        summary: '방 삭제',
        description: '방 삭제 API'
    })
    deleteRoom(@Param('id') id: number): Promise<void> {
        return this.roomService.deleteRoom(id);
    }
}
