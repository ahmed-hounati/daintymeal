import { Test, TestingModule } from '@nestjs/testing';
import { RestoController } from './resto.controller';

describe('RestoController', () => {
  let controller: RestoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestoController],
    }).compile();

    controller = module.get<RestoController>(RestoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
