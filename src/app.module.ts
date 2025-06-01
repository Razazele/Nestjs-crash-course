import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpisodesModule } from './episodes/episodes.module';
import { TopicsModule } from './topics/topics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/typeorm.config';
import { Episode } from './episodes/entity/episode.entity';

@Module({
  imports: [
    EpisodesModule,
    TopicsModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Episode]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
