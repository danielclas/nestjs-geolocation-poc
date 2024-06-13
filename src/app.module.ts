import { Module } from '@nestjs/common';
import { LocationController } from './location/location.controller';
import { LocationService } from './location/location.service';
import { LocationModule } from './location/location.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location/location.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'postgis_test',
      entities: [Location],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Location]),
    LocationModule,
  ],
  controllers: [LocationController],
  providers: [LocationService],
})
export class AppModule {}
