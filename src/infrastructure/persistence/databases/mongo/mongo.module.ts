import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MongoConfigService } from "./config/mongo-config";
import {  ProductMongo, ProductSchema } from "./schema/product.schema";
import { ProductMongoRepository } from "./repositories/product.repository";
import { WareHouseMongo, WareHouseSchema } from "./schema/warehouse.schema";
import { InventoryMongo, InventorySchema } from "./schema/inventory.schema";
import { InventoryMongoRepository } from "./repositories/inventory.repository";
import { WareHouseMongoRepository } from "./repositories/warehouse.repository";
//import { MongoServerErrorExceptionFilter } from "../exception-filters/mongo-server-error.exception-filter";


@Module({
    imports: [
    
    MongooseModule.forRootAsync({useClass: MongoConfigService}),
    MongooseModule.forFeature([
        {name : ProductMongo.name, schema: ProductSchema},
        {name : WareHouseMongo.name, schema: WareHouseSchema},
        {name : InventoryMongo.name, schema: InventorySchema}

    ])
],
    providers: [
        ProductMongoRepository,
        InventoryMongoRepository,
        WareHouseMongoRepository],
    
    exports: [
        ProductMongoRepository,
        InventoryMongoRepository,
        WareHouseMongoRepository,
        MongooseModule.forFeature([
        {name : ProductMongo.name, schema: ProductSchema},
        {name : WareHouseMongo.name, schema: WareHouseSchema},
        {name : InventoryMongo.name, schema: InventorySchema}

    ])]
})
export class MongoModule {}

