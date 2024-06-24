import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigAsync } from './data/database-config/typeorm/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getEnvPath } from 'common/helper/env.helper';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServeStaticModule } from '@nestjs/serve-static';

const envFilePath: string = getEnvPath(`${__dirname}/../common/envs`);
console.log(envFilePath);
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    EventEmitterModule.forRoot({ delimiter: '.' }),

    TypeOrmModule.forRootAsync(TypeOrmConfigAsync),
    ServeStaticModule.forRoot({
      serveRoot: '/static',
      rootPath: process.env.STORE_FILES_PATH,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
