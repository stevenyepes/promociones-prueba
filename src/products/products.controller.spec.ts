import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { IProduct } from './product.schema';
import { resolve } from 'path';
import { rejects } from 'assert';
jest.mock('./products.service');

describe('Products Controller', () => {
  let controller: ProductsController;
  let service : ProductsService;

  let uniqueResult: IProduct = {
    id: 5,
    brand: 'asdad',
    description: 'dd',
    image: 'asf',
    price: 25000
  }

  let productsResult: IProduct[] = [{
    id: 5,
    brand: 'asdadty',
    description: 'dd',
    image: 'asf',
    price: 25000
  },
  {
    id: 6,
    brand: 'rrtsh',
    description: 'dd',
    image: 'asf',
    price: 25000
  },
  {
    id: 7,
    brand: 'mmrtas',
    description: 'typpt a',
    image: 'asf',
    price: 25000
  }]
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService]
    }).compile();

    service = module.get<ProductsService>(ProductsService)
    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find by id when param is number', async () => {

    jest.spyOn(service, 'findById').mockImplementation(() => new Promise<IProduct[]>((resolve, rejects) => {
      resolve([uniqueResult])
    }) );
    const products = await controller.find('5');    
    const product = products[0];
    expect(products).toBeDefined();
    expect(product.id).toBe(5);
    expect(product.brand).toBe('asdad');
  });

  it('should find by brand or description when param is not a number', async () => {

    const searhPattern = 'ty';

    jest.spyOn(service, 'findByBrandOrDescription').mockImplementation(() => new Promise<IProduct[]>((resolve, rejects) => {
      resolve(productsResult.filter(p => p.brand.includes(searhPattern) || p.description.includes('ty')))
    }) );
    const products = await controller.find(searhPattern);    
    expect(products).toBeDefined();
    expect(products.length).toBe(2);
    expect(products.find(p => p.id == 5)).toStrictEqual({
      id: 5,
      brand: 'asdadty',
      description: 'dd',
      image: 'asf',
      price: 25000
    });
  });

});
