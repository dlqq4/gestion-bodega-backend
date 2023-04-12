import { Module } from "@nestjs/common";
import { InventoryController } from "./controllers/inventory.controller";
import { ProductController } from "./controllers/product.controller";
import { WareHouseController } from "./controllers/warehouse.controller";
import { PersistenceModule } from "./persistence/persistence.module";



@Module({
    imports:[PersistenceModule],
    controllers:[ProductController, WareHouseController, InventoryController],
    providers:[],
    exports:[]
})
export class InfraestructurebModule{}