import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { createRoomDto } from './dto/create-room.dto';
import { Content } from '../content/content.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {}

  async createRoom(createRoomDto: createRoomDto): Promise<Room> {
    const { titles } = createRoomDto;
    const room = this.roomRepository.create({ titles });
    await this.roomRepository.save(room);
    return room;
  }

  async getAllRooms(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  async deleteRoom(id: number): Promise<void> {
    await this.contentRepository
      .createQueryBuilder()
      .delete()
      .where('room_id = :roomId', { roomId: id })
      .execute();
    const result = await this.roomRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Room not found');
    }
  }
}
