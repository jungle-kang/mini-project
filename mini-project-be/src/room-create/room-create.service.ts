import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { Repository } from 'typeorm/index';
import { RoomCreate } from './entities/room-create.entity';
import { CreateRoomCreateDto } from './dto/create-room-create.dto';
import { UpdateRoomCreateDto } from './dto/update-room-create.dto';

@Injectable()
export class RoomCreateService {
  constructor(
    @InjectRepository(RoomCreate) private roomCreateRepository: Repository<RoomCreate>,
  ) {}

  getRoom(): string {
    return 'Room!';
  }

  findAll(): Promise<RoomCreate[]> {
    return this.roomCreateRepository.find();
  }

  async save(createRoomCreateDto: CreateRoomCreateDto): Promise<RoomCreate> {
      const newRoom = this.roomCreateRepository.create(createRoomCreateDto);  // DTO를 엔터티로 변환
      return await this.roomCreateRepository.save(newRoom);  // 엔터티 저장 후 반환
    }

  async remove(id: number): Promise<void> {
    await this.roomCreateRepository.delete({ id });
  }

}
