import { IsString, IsNumber, IsOptional, MinLength } from 'class-validator';

export class CreateInstallationRuleDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsNumber()
  fee: number;

  @IsNumber()
  free_distance: number;

  @IsNumber()
  extra_meter_price: number;

  @IsOptional()
  @IsString()
  description?: string;
}
