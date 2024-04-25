import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './room.entity';
import { createRoomDto } from './dto/create-room.dto';

@Controller('rooms')
export class RoomController {
    constructor(private readonly roomService: RoomService) { }

    @Post('/')
    createRoom(@Body() createRoomDto: createRoomDto): Promise<Room> {
        return this.roomService.createRoom(createRoomDto);
    }

    @Get('/')
    getAllRooms(): Promise<Room[]> {
        return this.roomService.getAllRooms();
    }

    @Delete('/:id')
    deleteRoom(@Param('id') id: number): Promise<void> {
        return this.roomService.deleteRoom(id);
    }
}
