import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(4, { message: 'Display Name must be at least 4 characters long' })
  @MaxLength(16, { message: 'Display Name must be at most 12 characters long' })
  displayName?: string;

  @IsOptional()
  @IsString()
  contactPhone?: string;

  @IsOptional()
  @IsString()
  facebookId?: string;

  @IsOptional()
  @IsString()
  avaUrl?: string;
}
