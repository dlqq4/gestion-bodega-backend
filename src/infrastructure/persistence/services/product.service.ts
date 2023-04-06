import { Injectable } from '@nestjs/common';
import { ProductMongoRepository } from '../databases/mongo/repositories/product.repository';
import { ProductMongo } from '../databases/mongo/schema/product.schema';


@Injectable()
export class ProductService extends ProductMongoRepository {

    
}