import { Column, Entity, Geography, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'geography',
    srid: 4326,
    spatialFeatureType: 'Point',
  })
  coordinates: Geography;
}
