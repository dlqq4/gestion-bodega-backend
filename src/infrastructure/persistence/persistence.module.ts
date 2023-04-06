import { Module } from "@nestjs/common";
import { ProductService } from "./services/product.service";
import { MongoModule } from "./databases/mongo/mongo.module";


@Module({
    imports: [MongoModule],

    providers: [ProductService],

    exports: [ProductService]

})

export class PersistenceModule { }