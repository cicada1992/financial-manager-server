import { TypeOrmModuleOptions } from '@nestjs/typeorm';

function ormConfig(): TypeOrmModuleOptions {
  const commonConf = {
    SYNCRONIZE: false,
    ENTITIES: [__dirname + '/domain/*{.ts,.js}'],
    MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
    MIGRATIONS_RUN: false,
  };

  // return {
  //   name: 'default',
  //   type: 'mysql',
  //   database: 'test',
  //   host: 'localhost',
  //   port: 13306,
  //   username: 'root',
  //   password: 'root',
  //   logging: true,
  //   synchronize: commonConf.SYNCRONIZE,
  //   entities: commonConf.ENTITIES,
  //   migrations: commonConf.MIGRATIONS,
  //   migrationsRun: commonConf.MIGRATIONS_RUN,
  // };

  return {
    name: 'default',
    type: 'mysql',
    database: 'financial-manager',
    host: 'financial-manager.clcwhiauob0e.ap-northeast-2.rds.amazonaws.com',
    port: 3306,
    username: 'admin',
    password: '5dnjfdlek!',
    logging: true,
    synchronize: commonConf.SYNCRONIZE,
    entities: commonConf.ENTITIES,
    migrations: commonConf.MIGRATIONS,
    migrationsRun: commonConf.MIGRATIONS_RUN,
  };
}

export { ormConfig };
