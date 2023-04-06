import { Module } from "@nestjs/common";
import { PersistenceModule } from "./persistence/persistence.module";
import { ProductController } from "./controllers/product.controller";
import { WareHouseController } from "./controllers/warehouse.controller";
import { InventoryController } from "./controllers/inventory.controller";


@Module({
    imports:[PersistenceModule],
    controllers:[ProductController, WareHouseController, InventoryController],
    providers:[],
    exports:[]
})
export class InfraestructurebModule{}