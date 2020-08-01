import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './infraestructure/modules/products.module';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://productListUser:productListPassword@localhost/promotions?authSource=admin';

@Module({
  imports: [MongooseModule.forRoot(MONGODB_URI), ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
