import { Test, TestingModule } from '@nestjs/testing';
import { RestoService } from './resto.service';

describe('RestoService', () => {
  let service: RestoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestoService],
    }).compile();

    service = module.get<RestoService>(RestoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
