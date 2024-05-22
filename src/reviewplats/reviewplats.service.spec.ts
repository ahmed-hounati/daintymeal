import { Test, TestingModule } from '@nestjs/testing';
import { ReviewplatsService } from './reviewplats.service';

describe('ReviewplatsService', () => {
  let service: ReviewplatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewplatsService],
    }).compile();

    service = module.get<ReviewplatsService>(ReviewplatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
