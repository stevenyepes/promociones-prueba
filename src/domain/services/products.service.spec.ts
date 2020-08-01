import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Product, IProduct } from '../entities/product.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('ProductsService', () => {
  let service: ProductsService;

  class ProductModel {
    constructor(private data) { }
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

  it('should search a product by Id and apply discount', async () => {

    jest.spyOn(ProductModel, 'find').mockImplementation(() => new Promise<IProduct[]>((resolve, rejects) => {
      resolve([{
        id: 121,
        brand: 'asdad',
        description: 'dd',
        image: '',
        price: 200
      }]);
    }));

    const product = await service.findById(121);
    expect(product).toBeDefined();
    expect(product[0].id).toBe(121);
    expect(product[0].brand).toBe('asdad');
    expect(product[0].price).toBe(200);
    expect(product[0].priceWithDiscount).toBe(100);

  });

});
