import { Test, TestingModule } from '@nestjs/testing';
import { ReviewplatsController } from './reviewplats.controller';

describe('ReviewplatsController', () => {
  let controller: ReviewplatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewplatsController],
    }).compile();

    controller = module.get<ReviewplatsController>(ReviewplatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
