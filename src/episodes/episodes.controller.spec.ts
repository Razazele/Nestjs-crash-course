import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { ConfigModule } from '../config/config.module';
import { EpisodesService } from './episodes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episode } from './entity/episode.entity';
import { CreateEpisodeDto } from './dto/create-episode.dto';

describe('EpisodesController', () => {
  let controller: EpisodesController;

  const mockEpisodesService = {
    findAll: jest.fn(),
    findFeatured: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Episode],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Episode]),
      ],
      controllers: [EpisodesController],
      providers: [
        {
          provide: EpisodesService,
          useValue: mockEpisodesService,
        },
      ],
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  }, 10000);

  describe('findAll', () => {
    it('should return an array of episodes', async () => {
      const mockEpisodes = [
        { id: '1', name: 'Episode 1', featured: false },
        { id: '2', name: 'Episode 2', featured: true },
      ];
      mockEpisodesService.findAll.mockResolvedValue(mockEpisodes);

      const result = await controller.findAll('asc');
      expect(result).toEqual(mockEpisodes);
      expect(mockEpisodesService.findAll).toHaveBeenCalledWith('asc');
    });
  });

  describe('findFeatured', () => {
    it('should return featured episodes', async () => {
      const mockFeaturedEpisodes = [
        { id: '2', name: 'Episode 2', featured: true },
      ];
      mockEpisodesService.findFeatured.mockResolvedValue(mockFeaturedEpisodes);

      const result = await controller.findFeatured();
      expect(result).toEqual(mockFeaturedEpisodes);
      expect(mockEpisodesService.findFeatured).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single episode', async () => {
      const mockEpisode = { id: '1', name: 'Episode 1', featured: false };
      mockEpisodesService.findOne.mockResolvedValue(mockEpisode);

      const result = await controller.findOne('1');
      expect(result).toEqual(mockEpisode);
      expect(mockEpisodesService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create a new episode', async () => {
      const createEpisodeDto: CreateEpisodeDto = {
        name: 'New Episode',
        featured: true,
      };
      const mockCreatedEpisode = {
        id: '3',
        ...createEpisodeDto,
      };
      mockEpisodesService.create.mockResolvedValue(mockCreatedEpisode);

      const result = await controller.create(createEpisodeDto);
      expect(result).toEqual(mockCreatedEpisode);
      expect(mockEpisodesService.create).toHaveBeenCalledWith(createEpisodeDto);
    });
  });

  describe('update', () => {
    it('should update an episode', async () => {
      const mockUpdatedEpisode = { id: '1', name: 'Updated Episode' };
      mockEpisodesService.update.mockResolvedValue(mockUpdatedEpisode);

      const result = await controller.update('1', { name: 'Updated Episode' });
      expect(result).toEqual(mockUpdatedEpisode);
      expect(mockEpisodesService.update).toHaveBeenCalledWith('1', {
        name: 'Updated Episode',
      });
    });
  });

  describe('remove', () => {
    it('should delete an episode', async () => {
      const mockDeleteResult = { message: 'Episode 1 successfully deleted' };
      mockEpisodesService.delete.mockResolvedValue(mockDeleteResult);

      const result = await controller.remove('1');
      expect(result).toEqual(mockDeleteResult);
      expect(mockEpisodesService.delete).toHaveBeenCalledWith('1');
    });
  });
});
