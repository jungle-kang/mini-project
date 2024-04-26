// src/content/content.controller.ts
import { Controller, Post, Get, Put, Param, Body, Patch, Delete } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('contents')
@Controller('contents')
export class ContentController {
  constructor(private readonly contentService: ContentService) { }

  @Post(':roomId')
  @ApiOperation({
    summary: 'roomId에 해당하는 content 생성',
    description: 'roomId에 해당하는 content 생성 API'
  })
  createContent(@Param('roomId') roomId: number, @Body() createContentDto: CreateContentDto) {
    return this.contentService.createContent(roomId, createContentDto.text);
  }

  @Get(':roomId')
  @ApiOperation({
    summary: 'roomId에 해당하는 content들 조회',
    description: 'roomId에 해당하는 content들 조회 API'
  })
  getContentByRoomId(@Param('roomId') roomId: number) {
    return this.contentService.getContentByRoomId(roomId);
  }

  // @Put(':id')
  // update(@Param('id') id: number, @Body() updateContentDto: UpdateContentDto) {
  //   return this.contentService.update(id, updateContentDto.text);
  // }
  @Patch(':id')
  @ApiOperation({
    summary: 'content 업데이트',
    description: 'content 업데이트 API'
  })
  updateContent(@Param('id') id: number, @Body() updateContentDto: UpdateContentDto) {
    return this.contentService.updateContent(id, updateContentDto.text);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'content 삭제',
    description: 'content 삭제 API'
  })
  deleteContent(@Param('id') id: number) {
    return this.contentService.deleteContent(id);
  }
}
