import { IsNotEmpty, IsNumber, IsString, isString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  descriptionFull: string;

  @IsNotEmpty()
  @IsNumber()
  originalPrice: number;

  @IsNotEmpty()
  @IsNumber()
  salePrice: number;

  @IsNotEmpty()
  @IsNumber()
  keyCount: number;

  @IsNotEmpty()
  @IsNumber()
  modes: number;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsString()
  movementType: string;

  @IsNotEmpty()
  @IsNumber()
  batteryCapacity: number;

  @IsNotEmpty()
  @IsString()
  switchType: string;

  @IsNotEmpty()
  @IsString()
  caseMatetial: string;

  @IsNotEmpty()
  @IsString()
  multiLayout: string;

  @IsNotEmpty()
  @IsString()
  typeId: string;
}
