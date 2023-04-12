import { Module } from "@nestjs/common";
import { ProductService } from "./services/product.service";
import { MongoModule } from "./databases/mongo/mongo.module";

import { InventoryService } from "./services/Inventory.service";
import { WareHouseService } from "../../infrastructure/persistence/services/warehouse.service";


@Module({
    imports: [MongoModule],

    providers: [ProductService, WareHouseService,  InventoryService ],

    exports: [ProductService, WareHouseService, InventoryService]

})

export class PersistenceModule { }