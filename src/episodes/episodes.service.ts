import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episode } from './entity/episode.entity';
import { CreateEpisodeDto } from './dto/create-episode.dto';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episode)
    private episodesRepository: Repository<Episode>,
  ) {}

  async findAll(sort: 'asc' | 'desc' = 'asc') {
    return this.episodesRepository.find({
      order: {
        name: sort === 'asc' ? 'ASC' : 'DESC',
      },
    });
  }

  async findFeatured() {
    return this.episodesRepository.find({
      where: { featured: true },
    });
  }

  async findOne(id: string) {
    return this.episodesRepository.findOne({ where: { id } });
  }

  async create(createEpisodeDto: CreateEpisodeDto) {
    const episode = this.episodesRepository.create(createEpisodeDto);
    return this.episodesRepository.save(episode);
  }

  async update(id: string, updateEpisodeDto: Partial<CreateEpisodeDto>) {
    const episode = await this.findOne(id);
    if (!episode) {
      throw new NotFoundException(`Episode with id ${id} not found`);
    }

    // Actualizar las propiedades del episodio
    Object.assign(episode, updateEpisodeDto);
    // Guardar los cambios
    return this.episodesRepository.save(episode);
  }

  async delete(id: string) {
    const episode = await this.findOne(id);
    if (!episode) {
      throw new NotFoundException(`Episode with id ${id} not found`);
    }

    // Eliminar el episodio
    await this.episodesRepository.remove(episode);
    return { message: `Episode ${id} successfully deleted` };
  }
}
