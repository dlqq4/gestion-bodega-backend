import { Module } from "@nestjs/common";
import { PersistenceModule } from "./persistence/persistence.module";
import { ProductController } from "./controllers/product.controller";


@Module({
    imports:[PersistenceModule],
    controllers:[ProductController],
    providers:[],
    exports:[]
})
export class InfraestructurebModule{}