import { Test, TestingModule } from '@nestjs/testing';
import { AntifraudServiceService } from './antifraud-service.service';

describe('AntifraudServiceService', () => {
  let service: AntifraudServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AntifraudServiceService],
    }).compile();

    service = module.get<AntifraudServiceService>(AntifraudServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
