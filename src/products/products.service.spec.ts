import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Product} from "./product.schema";
import { getModelToken } from '@nestjs/mongoose';

describe('ProductsService', () => {
  let service: ProductsService;

  class ProductModel {
    constructor(private data) {}
    static find = jest.fn().mockResolvedValue([]);
    
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
});
