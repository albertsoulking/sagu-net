import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateRegionDto {
  @IsString()
  village_name: string;

  @IsOptional()
  @IsString()
  myanmar_name?: string;

  @IsOptional()
  @IsString()
  township?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  coverage_radius?: number;

  @IsOptional()
  @IsString()
  status?: string;
}
