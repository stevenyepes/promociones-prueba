import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpService, HttpModule } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { ProductsController } from './../src/products/products.controller';
import { ProductsService } from './../src/products/products.service';
import { ProductsModule } from './../src/products/products.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let httpService: HttpService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    httpService = moduleFixture.get<HttpService>(HttpService);
    await app.init();
  });

  it('/ (GET)', async () => {

    const result: AxiosResponse = {
      data: "Main API",
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
    const response = await request(app.getHttpServer()).get('/').expect(200);

    expect(response.text).toEqual('Main API')

  });

  afterAll(async () => {
    await app.close();
  });
  
});

