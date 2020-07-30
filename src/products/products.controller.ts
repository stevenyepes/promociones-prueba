import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { Product, IProduct } from './product.schema';
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
    async findAll(): Promise<IProduct[]> {
      return this.productsService.findAll();
    }

    @Get(':search')
    @ApiResponse({
      status: 200,
      description: 'Search product by Id if is give it, brand or description otherwise',
      type: Product,
    })
    async find(@Param('search') search: string): Promise<IProduct[]> {
      if(Number(search)){
        return this.productsService.findById(Number(search));
      }
      return this.productsService.findByBrandOrDescription(search);
    }

}
