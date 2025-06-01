import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Episode } from 'src/episodes/entity/episode.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: 'localhost\\LOCALSQLSERVER',
  port: 1433,
  username: 'dev_user',
  password: 'DevPassword123!',
  database: 'nestpj',
  entities: [Episode],
  synchronize: true,
  options: {
    trustServerCertificate: true,
    encrypt: false,
    enableArithAbort: true,
  },
};
