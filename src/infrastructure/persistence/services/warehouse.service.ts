import { Injectable } from '@nestjs/common';
import { ProductMongoRepository } from '../databases/mongo/repositories/product.repository';
import { ProductMongo } from '../databases/mongo/schema/product.schema';
import { WareHouseMongoRepository } from '../databases/mongo/repositories/warehouse.repository';


@Injectable()
export class WareHouseService extends WareHouseMongoRepository {

    
}