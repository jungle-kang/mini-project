// src/content/content.controller.ts
import { Controller, Post, Get, Put, Param, Body, Patch, Delete } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Controller('contents')
export class ContentController {
  constructor(private readonly contentService: ContentService) { }

  @Post(':roomId')
  create(@Param('roomId') roomId: number, @Body() createContentDto: CreateContentDto) {
    return this.contentService.create(roomId, createContentDto.text);
  }

  @Get(':roomId')
  findAll(@Param('roomId') roomId: number) {
    return this.contentService.findAll(roomId);
  }

  // @Put(':id')
  // update(@Param('id') id: number, @Body() updateContentDto: UpdateContentDto) {
  //   return this.contentService.update(id, updateContentDto.text);
  // }
  @Patch(':id')
  updatePartial(@Param('id') id: number, @Body() updateContentDto: UpdateContentDto) {
    return this.contentService.update(id, updateContentDto.text);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.contentService.delete(id);
  }
}
