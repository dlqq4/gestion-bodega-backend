import { Module } from "@nestjs/common";
import { MongoModule } from "./databases/mongo/mongo.module";






@Module({
    imports: [MongoModule],

    providers: [
        

       
    ],
    exports: [
       
       

       
     ]
})
export class PersistenceModule { }