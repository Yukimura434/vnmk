import { IsNotEmpty, IsString, isString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  availabilityStatus: string;

  @IsNotEmpty()
  @IsString()
  order: number;

  @IsNotEmpty()
  @IsString()
  menuId: string;
}
