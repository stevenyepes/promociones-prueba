import { Body, Controller, Get, Post } from '@nestjs/common';
import { Product } from './product.schema';
import { ProductsService } from './products.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('cats')
@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService){}

    @Get()
    @ApiResponse({
      status: 200,
      description: 'Catálogo de productos',
      type: Product,
    })
    async findAll(): Promise<Product[]> {
      return this.productsService.findAll();
    }

}
