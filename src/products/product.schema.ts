import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from '@nestjs/swagger';


@Schema()
export class Product extends Document {
    
    @Prop()
    @ApiProperty({ example: 1, description: 'Identificador único del producto' })
    id: number;

    @ApiProperty({ example: 'weñxoab', description: 'Marca del producto' })
    @Prop()
    brand: string;
    
    @ApiProperty({ example: 'pnyn rlxbewnk', description: 'Descripción del producto' })
    @Prop()
    description: string;

    @ApiProperty({ example: 'trcwl iagxxh', description: 'URI de la imágen' })
    @Prop()
    image: string

    @ApiProperty({ example: 200, description: 'Precio del producto' })
    @Prop()
    price: number
}

export const ProductSchema = SchemaFactory.createForClass(Product);