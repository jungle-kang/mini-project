import { Test, TestingModule } from '@nestjs/testing';
import { RoomCreateService } from './room-create.service';

describe('RoomCreateService', () => {
  let service: RoomCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomCreateService],
    }).compile();

    service = module.get<RoomCreateService>(RoomCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
