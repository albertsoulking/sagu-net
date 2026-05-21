import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsNumber()
  @Min(0)
  salary: number;

  @IsOptional()
  @IsNumber()
  overtime_rate?: number;

  @IsOptional()
  @IsNumber()
  absent_deduction?: number;

  @IsOptional()
  @IsNumber()
  bonus?: number;

  @IsOptional()
  @IsNumber()
  advance_salary?: number;

  @IsOptional()
  @IsNumber()
  attendance_days?: number;
}
