import { Module } from "@nestjs/common";
import { ProductService } from "./services/product.service";
import { MongoModule } from "./databases/mongo/mongo.module";
import { InventoryService } from "./services/inventory.service";
import { WareHouseService } from "./services/warehouse.service";


@Module({
    imports: [MongoModule],

    providers: [ProductService, InventoryService, WareHouseService],

    exports: [ProductService, InventoryService, WareHouseService]

})

export class PersistenceModule { }