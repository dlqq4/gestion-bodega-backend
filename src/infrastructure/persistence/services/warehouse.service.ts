import { Injectable } from '@nestjs/common';
import { WareHouseMongoRepository } from '../databases/mongo/repositories/warehouse.repository';


@Injectable()
export class WareHouseService extends WareHouseMongoRepository {

    
}