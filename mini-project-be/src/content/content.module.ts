import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './content.entity';
import { Room } from '../room/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Content, Room])],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule { }
