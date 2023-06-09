import { Module } from "@nestjs/common";
import { ProductService } from "./services/product.service";
import { MongoModule } from "./databases/mongo/mongo.module";
import { WareHouseService } from "../../infrastructure/persistence/services/warehouse.service";
//import { InventoryService } from "./services/Inventory.service";
import { InventoryService } from "../persistence/services/inventory.service";


@Module({
    imports: [MongoModule],

    providers: [ProductService, WareHouseService,  InventoryService ],

    exports: [ProductService, WareHouseService, InventoryService]

})

export class PersistenceModule { }