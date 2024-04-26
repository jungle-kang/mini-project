import { Test, TestingModule } from '@nestjs/testing';
import { RoomCreateController } from './room-create.controller';
import { RoomCreateService } from './room-create.service';

describe('RoomCreateController', () => {
  let controller: RoomCreateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomCreateController],
      providers: [RoomCreateService],
    }).compile();

    controller = module.get<RoomCreateController>(RoomCreateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
