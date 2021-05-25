import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { TenantsModule } from './tenants/tenants.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    GraphQLModule.forRoot({
      cors: false,
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get<ConnectionOptions>('database'),
      inject: [ConfigService],
    }),
    TenantsModule,
  ],
})
export class AppModule {}
