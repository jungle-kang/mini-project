// src/content/content.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from './content.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>
  ) { }

  create(roomId: number, text: string): Promise<Content> {
    const content = this.contentRepository.create({ text, room: { id: roomId } });
    return this.contentRepository.save(content);
  }

  findAll(roomId: number): Promise<Content[]> {
    return this.contentRepository.find({ where: { room: { id: roomId } } });
  }

  // update(id: number, text: string): Promise<Content> {
  //   return this.contentRepository.save({ id, text });
  // }
  async update(id: number, text: string): Promise<Content> {
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

  async delete(id: number): Promise<void> {
    const result = await this.contentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Content with ID "${id}" not found`);
    }
  }
}
