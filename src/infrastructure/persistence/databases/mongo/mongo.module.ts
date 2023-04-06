import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MongoConfigServicio } from "./config/mongo-config";
import { Product, ProductSchema } from "./schema/product.schema";
import { ProductMongoRepository } from "./repositories/product.repository";
//import { MongoServerErrorExceptionFilter } from "../exception-filters/mongo-server-error.exception-filter";


@Module({
    imports: [
    
    MongooseModule.forRootAsync({useClass: MongoConfigServicio}),
    MongooseModule.forFeature([{name : Product.name, schema: ProductSchema}])
],
    providers: [ProductMongoRepository],
    exports: [ProductMongoRepository]
})
export class MongoModule {}