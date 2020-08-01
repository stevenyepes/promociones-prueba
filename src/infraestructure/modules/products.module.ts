import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { ProductsController } from '../../app/controllers/products.controller';
import { ProductsService } from '../../domain/services/products.service';
import { Product, ProductSchema } from "../../domain/entities/product.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema}])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
