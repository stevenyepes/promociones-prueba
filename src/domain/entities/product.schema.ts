import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export interface IProduct {
    id: number;
    brand: string;
    description: string;
    image: string;
    price: number;
    priceWithDiscount?: number;
}

@Schema()
export class Product extends Document implements IProduct{
    
    @Prop()
    @ApiProperty({ example: 1, description: 'Identificador único del producto' })
    id: IProduct['id'];

    @ApiProperty({ example: 'weñxoab', description: 'Marca del producto' })
    @Prop()
    brand: IProduct['brand'];
    
    @ApiProperty({ example: 'pnyn rlxbewnk', description: 'Descripción del producto' })
    @Prop()
    description: IProduct['description'];

    @ApiProperty({ example: 'trcwl iagxxh', description: 'URI de la imágen' })
    @Prop()
    image: IProduct['image'];

    @ApiProperty({ example: 200, description: 'Precio del producto' })
    @Prop()
    price: IProduct['price'];

    @ApiPropertyOptional({ example: 100, description: 'Precio del producto con descuento' })
    @Prop()
    priceWithDiscount?: IProduct['priceWithDiscount'];
   
}

export const ProductSchema = SchemaFactory.createForClass(Product);