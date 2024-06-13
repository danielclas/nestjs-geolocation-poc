import { BadRequestException, Injectable } from '@nestjs/common';
import { Point, Repository } from 'typeorm';
import { Location } from './location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLocationDto } from './location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  public async create(location: CreateLocationDto): Promise<Location> {
    const coordinates: Point = {
      type: 'Point',
      coordinates: [location.longitude, location.latitude],
    };

    return this.locationRepository.save({
      name: location.name,
      coordinates,
    });
  }

  public async getWithinRange(
    longitude: number,
    latitude: number,
    rangeKm: number,
  ): Promise<Location[]> {
    console.log(longitude, latitude, rangeKm);
    const isValidLongitude = longitude >= -180 && longitude <= 180;
    const isValidLatitude = latitude >= -90 && latitude <= 90;

    if (!isValidLongitude || !isValidLatitude) {
      throw new BadRequestException('Invalid coordinates');
    }

    return this.locationRepository
      .createQueryBuilder('location')
      .select()
      .where(
        'ST_DWithin(location.coordinates, ST_SetSRID(ST_MakePoint(:lon, :lat), 4326), :range)',
        { lon: longitude, lat: latitude, range: rangeKm * 1000 },
      )
      .getMany();
  }
}
