import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TypeService } from './service/type.service';
import { CreateTypeDto } from './dto/CreateType.dto';

@Controller('types')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Post('')
  createType(@Body() createTypeDto: CreateTypeDto) {
    return this.typeService.createType(createTypeDto);
  }

  @Put(':typeId')
  updateType(
    @Param('typeId') typeId: string,
    @Body() updateTypeDto: CreateTypeDto,
  ) {
    return this.typeService.updateType(typeId, updateTypeDto);
  }

  @Delete(':typeId')
  deleteType(@Param('typeId') typeId: string) {
    return this.typeService.deleteType(typeId);
  }

  @Get('')
  getAllType() {
    return this.typeService.getAllType();
  }

  @Get('/category/:categoryId')
  getTypeBycategoryId(@Param('categoryId') categoryId: string) {
    return this.typeService.getTypesByCategoryId(categoryId);
  }
}
