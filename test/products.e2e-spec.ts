
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpService, HttpModule } from '@nestjs/common';
import * as request from 'supertest';
import { ProductsService } from '../src/domain/services/products.service';
import { ProductsModule } from './../src/products/products.module';
import { IProduct, Product } from './../src/domain/entities/product.schema';
import { getModelToken } from '@nestjs/mongoose';


describe('ProductsController (e2e)', () => {
    let app: INestApplication;
    let httpService: HttpService;
    let productService: ProductsService;

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

    const  ProductModel = {
        find: () => {
            return productsResult 
        },
        findById: (id: number) => {
            return productsResult.find(p => p.id === id);
        }
    }
  
    beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [ProductsModule, HttpModule],
      })
      .overrideProvider(getModelToken(Product.name))
      .useValue(ProductModel).compile();
  
      app = moduleFixture.createNestApplication();
      httpService = moduleFixture.get<HttpService>(HttpService);
      productService = moduleFixture.get<ProductsService>(ProductsService)
      await app.init();
    });
  
    it('/ (GET) products', () => {

      return request(app.getHttpServer()).get('/products').expect(200).expect(
          productsResult
      );  
    });

    afterAll(async () => {
        await app.close();
      });
  });