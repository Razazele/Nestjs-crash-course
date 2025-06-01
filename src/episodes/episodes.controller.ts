import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { ConfigService } from '../../src/config/config.service';

@Controller('episodes')
export class EpisodesController {
  constructor(
    private readonly episodesService: EpisodesService,
    private configService: ConfigService,
  ) {}

  @Get()
  async findAll(@Query('sort') sort: 'asc' | 'desc' = 'desc') {
    const episode = await this.episodesService.findAll(sort);
    if (!episode) {
      throw new HttpException('Episode not Found', HttpStatus.NOT_FOUND);
    }
    return episode;
  }

  @Get('featured')
  async findFeatured() {
    const featured = await this.episodesService.findFeatured();
    if (!featured) {
      throw new HttpException(
        'No featured episodes found',
        HttpStatus.NOT_FOUND,
      );
    }
    return featured;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const episode = await this.episodesService.findOne(id);
    if (!episode) {
      throw new HttpException(
        `Episode with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return episode;
  }

  @Post()
  async create(@Body() input: CreateEpisodeDto) {
    const episode = await this.episodesService.create(input);
    if (!episode) {
      throw new HttpException(
        'Failed to create episode',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return episode;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() fields: any) {
    const episode = await this.episodesService.update(id, fields);
    if (!episode) {
      throw new HttpException(
        `Episode with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return episode;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.episodesService.delete(id);
    if (!result) {
      throw new HttpException(
        `Episode with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return { message: `Episode ${id} successfully deleted` };
  }
}
