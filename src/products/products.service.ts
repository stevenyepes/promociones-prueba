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
        let product = await this.productRepository.find({'id': id},{_id:0});
        return this.validateAndApplyDiscount(product, id.toString())
    }

    async findByBrandOrDescription(search: string): Promise<IProduct[]> {
        const queryParams = {
            $or: [  {brand: { $regex: '.*' + search + '.*'}},
                    {description: { $regex: '.*' + search + '.*'}}
                ]
        }
        let products = await this.productRepository.find(queryParams, {_id:0});
        return this.validateAndApplyDiscount(products, search)
    }

    private validateAndApplyDiscount: (product: IProduct[], search: string) => IProduct[] = (product: IProduct[], search: string) =>  {
        if(this.isPalindrome(search)) {
            return product.map(this.applyDiscount)
        } else {
            return product;
        }
    }

    private applyDiscount: (product: IProduct) => IProduct = (product: IProduct) => {
        product.priceWithDiscount = product.price * 0.5;    
        return product;
    };    


    private isPalindrome = (word: string) =>  {
        var re = /[\W_]/g;
        var lowRegStr = word.toLowerCase().replace(re, '');
        var reverseStr = lowRegStr.split('').reverse().join(''); 
        return reverseStr === lowRegStr;
    }

}
