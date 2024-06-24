import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigAsync } from './data/database-config/typeorm/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getEnvPath } from 'common/helper/env.helper';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ApiModule } from './api/api.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './data/intercerptor/catch/catch.interceptor';

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
    ApiModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    // morgan es para reguistar en logging todas las peticiones
    // npm install --save morgan
  ],
})
export class AppModule {}
