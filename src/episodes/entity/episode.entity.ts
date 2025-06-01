import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('episode')
export class Episode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  featured: boolean;
}
