import { Injectable } from '@nestjs/common';
import { Product, IProduct } from './product.schema';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productRepository: Model<Product>) {}

    async findAll(): Promise<IProduct[]> {
        return this.productRepository.find().exec();
    }

    async findById(id: number): Promise<IProduct[]> {
        return this.productRepository.find({'id': id},{_id:0});
    }

    async findByBrandOrDescription(search: string): Promise<IProduct[]> {
        return this.productRepository.find({
            $or: [  {brand: { $regex: '.*' + search + '.*'}},
                    {description: { $regex: '.*' + search + '.*'}}
                ]
        });
    }

}
