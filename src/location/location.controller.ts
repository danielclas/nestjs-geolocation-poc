import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './location.dto';
import { Location } from './location.entity';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async create(@Body() location: CreateLocationDto): Promise<Location> {
    return this.locationService.create(location);
  }

  @Get('radius')
  async getWithinRange(
    @Query('lat') lat: number,
    @Query('lon') lon: number,
    @Query('rangeKm') rangeKm: number,
  ): Promise<Location[]> {
    return this.locationService.getWithinRange(+lon, +lat, +rangeKm);
  }
}
