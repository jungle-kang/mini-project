// src/content/content.controller.ts
import { Controller, Post, Get, Put, Param, Body, Patch, Delete } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Controller('contents')
export class ContentController {
  constructor(private readonly contentService: ContentService) { }

  @Post(':roomId')
  createContent(@Param('roomId') roomId: number, @Body() createContentDto: CreateContentDto) {
    return this.contentService.createContent(roomId, createContentDto.text);
  }

  @Get(':roomId')
  getContentByRoomId(@Param('roomId') roomId: number) {
    return this.contentService.getContentByRoomId(roomId);
  }

  // @Put(':id')
  // update(@Param('id') id: number, @Body() updateContentDto: UpdateContentDto) {
  //   return this.contentService.update(id, updateContentDto.text);
  // }
  @Patch(':id')
  updateContent(@Param('id') id: number, @Body() updateContentDto: UpdateContentDto) {
    return this.contentService.updateContent(id, updateContentDto.text);
  }

  @Delete(':id')
  deleteContent(@Param('id') id: number) {
    return this.contentService.deleteContent(id);
  }
}
