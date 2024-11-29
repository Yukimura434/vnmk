import { IsNotEmpty, IsNumber, IsString, isString } from 'class-validator';

export class CreateMenuDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  order: number;
}
