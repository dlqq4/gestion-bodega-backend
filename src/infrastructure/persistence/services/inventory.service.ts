import { Injectable } from '@nestjs/common';
import { InventoryMongoRepository } from '../databases/mongo/repositories/inventory.repository';


@Injectable()
export class InventoryService extends InventoryMongoRepository {

    
}