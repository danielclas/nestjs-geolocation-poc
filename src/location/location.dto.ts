import { IsNumber, Min, Max, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateLocationDto {
  @IsString()
  name: string;

  @IsNumber()
  @Transform((obj) => parseFloat(obj.value))
  @Min(-180)
  @Max(180)
  longitude: number;

  @IsNumber()
  @Transform((obj) => parseFloat(obj.value))
  @Min(-90)
  @Max(90)
  latitude: number;
}
