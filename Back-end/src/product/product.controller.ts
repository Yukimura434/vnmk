import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from 'src/product/dto/CreateProduct.dto';
import { ProductService } from 'src/product/service/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('recommend/:productId')
  async getRecommendedProducts(@Param('productId') productId: string) {
    return this.productService.getRecommendedProducts(productId);
  }

  @Post('')
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get('get-all')
  getAllProduct() {
    return this.productService.getAllProducts();
  }

  @Get('type/:typeId')
  getProductByTypeId(@Param('typeId') typeId: string) {
    return this.productService.getProductByTypeId(typeId);
  }

  @Get(':productId')
  getProductById(@Param('productId') productId: string) {
    return this.productService.getProductById(productId);
  }

  @Get('')
  getProductsByFilter(@Query() filter: any) {
    return this.productService.getProductsByFilter(filter);
  }

  @Delete(':productId')
  deleteProductById(@Param('productId') productId: string) {
    return this.productService.deleteProductById(productId);
  }

  @Put(':productId')
  async updateProductById(
    @Param('productId') productId: string,
    @Body() updateProductDto: CreateProductDto,
  ) {
    return this.productService.updateProductById(productId, updateProductDto);
  }
}
