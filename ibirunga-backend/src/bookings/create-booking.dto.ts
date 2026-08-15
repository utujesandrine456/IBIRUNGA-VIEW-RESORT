import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookingDto {
  @IsString()
  @MinLength(1)
  checkIn: string;

  @IsString()
  @MinLength(1)
  checkOut: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  adults: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  children?: number;

  @IsOptional()
  @IsString()
  roomType?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  roomCount?: number;

  @IsString()
  @MinLength(2)
  guestName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  phone: string;

  @IsOptional()
  @IsString()
  specialRequests?: string;

  @IsOptional()
  @IsString()
  source?: string;
}
