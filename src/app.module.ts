import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';

const DBURI = process.env.DBURI || 'localhost';

@Module({
  imports: [MongooseModule.forRoot(DBURI), ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
