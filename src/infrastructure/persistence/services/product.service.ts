import { Injectable } from '@nestjs/common';
import { ProductMongoRepository } from '../databases/mongo/repositories/product.repository';




@Injectable()
export class ProductService extends ProductMongoRepository {

}