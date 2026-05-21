import {
  IsString,
  IsOptional,
  IsEmail,
  IsNumber,
  IsEnum,
  MinLength,
} from 'class-validator';
import { UserStatus } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  village?: string;

  @IsOptional()
  @IsString()
  township?: string;

  @IsOptional()
  @IsNumber()
  region_id?: number;

  @IsOptional()
  @IsNumber()
  package_id?: number;

  @IsOptional()
  @IsString()
  onu_mac?: string;

  @IsOptional()
  @IsString()
  onu_serial?: string;

  @IsOptional()
  @IsString()
  onu_type?: string;

  @IsOptional()
  @IsString()
  port_number?: string;

  @IsOptional()
  @IsNumber()
  installation_fee?: number;

  @IsOptional()
  @IsString()
  installation_type?: string;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}
