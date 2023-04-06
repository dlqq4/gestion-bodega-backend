import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MongoConfigService } from "./config/mongo-config";
import {  ProductMongo, ProductSchema } from "./schema/product.schema";
import { ProductMongoRepository } from "./repositories/product.repository";
//import { MongoServerErrorExceptionFilter } from "../exception-filters/mongo-server-error.exception-filter";


@Module({
    imports: [
    
    MongooseModule.forRootAsync({useClass: MongoConfigService}),
    MongooseModule.forFeature([{name : ProductMongo.name, schema: ProductSchema}])
],
    providers: [ProductMongoRepository],
    exports: [ProductMongoRepository, MongooseModule.forFeature([{name : ProductMongo.name, schema: ProductSchema}])]
})
export class MongoModule {}