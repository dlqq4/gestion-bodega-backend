import { Injectable } from '@nestjs/common';
import { ProductMongoRepository } from '../databases/mongo/repositories/product.repository';
import { ProductMongo } from '../databases/mongo/schema/product.schema';
import { InventoryMongoRepository } from '../databases/mongo/repositories/inventory.repository';


@Injectable()
export class InventoryService extends InventoryMongoRepository {

    
}