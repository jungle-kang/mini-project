import { Module } from '@nestjs/common';
import { RoomCreateService } from './room-create.service';
import { RoomCreateController } from './room-create.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomCreate } from './entities/room-create.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomCreate])],
  controllers: [RoomCreateController],
  providers: [RoomCreateService],
})
export class RoomCreateModule {}
