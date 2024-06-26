// src/content/content.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Content } from './content.entity';
import { Room } from '../room/room.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async createContent(roomId: number, text: string): Promise<Content> {
    console.log(roomId, text);
    const content = await this.contentRepository.create({
      text,
      room_id: { id: roomId },
    });
    return this.contentRepository.save(content);
  }

  // async getContentByRoomId(roomId: number): Promise<Content[]> {
  //   // const content = await this.contentRepository.find({
  //   //   where: {
  //   //     room_id: { id: roomId }
  //   //   }
  //   // });
  //   return content;
  // }

  async getContentByRoomId(roomId: number): Promise<Content[]> {
    let content: any = await this.contentRepository
      .createQueryBuilder('content')
      .leftJoinAndSelect('content.room_id', 'room')
      .where('room.id = :roomId', { roomId })
      .getMany();
    if (content.length === 0) {
      content = await this.roomRepository.findBy({ id: roomId });
      content = [
        {
          id: '',
          text: '',
          room_id: content[0],
        },
      ];
    }
    return content;
  }
  // update(id: number, text: string): Promise<Content> {
  //   return this.contentRepository.save({ id, text });
  // }
  async updateContent(id: number, text: string): Promise<Content> {
    // ID에 해당하는 Content를 찾습니다.
    const content = await this.contentRepository.findOne({ where: { id: id } });
    if (!content) {
      throw new NotFoundException('Content not found');
    }
    // Content의 text 필드를 업데이트합니다.
    content.text = text;
    // 변경된 Content를 저장합니다.
    return this.contentRepository.save(content);
  }

  async deleteContent(id: number): Promise<void> {
    const result = await this.contentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Content with ID "${id}" not found`);
    }
  }
}
