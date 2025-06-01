import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesService } from './episodes.service';
import { Episode } from './entity/episode.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('EpisodesService', () => {
  let service: EpisodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Episode],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Episode]),
      ],
      providers: [EpisodesService],
    }).compile();

    service = module.get<EpisodesService>(EpisodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
