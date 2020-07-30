import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Product } from "./product.schema";
import { getModelToken } from '@nestjs/mongoose';

describe('ProductsService', () => {
  let service: ProductsService;

  class ProductModel {
    constructor(private data) {}
    static find = jest.fn().mockResolvedValue([{
      id: 5,
      brand: 'asdad',
      description: 'dd'
  }]);
    
  }

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService, 
        {
          provide: getModelToken(Product.name),
          useValue: ProductModel
        },
    ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should search a product by Id', async () => {

    const product = await service.findById(5);    
    expect(product).toBeDefined();
    expect(product[0].id).toBe(5);
    expect(product[0].brand).toBe('asdad');
  });

});
