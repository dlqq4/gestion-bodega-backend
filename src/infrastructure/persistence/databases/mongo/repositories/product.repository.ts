import { Injectable } from "@nestjs/common"
import { IRepository } from "./base/repository.base"
import { ProductMongo, ProductMongoDocument } from "../schema/product.schema"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"
import { Observable, from } from "rxjs"



@Injectable()
export class ProductMongoRepository implements IRepository<ProductMongo>{
    
    constructor(@InjectModel(ProductMongo.name) private readonly productRepo: Model<ProductMongoDocument>) {

    }

    create(entity: ProductMongo): Observable<ProductMongo> {
        return from(this.productRepo.create(entity))
    }
    
    findAll(): Observable<ProductMongo[]> {
        throw new Error("Method not implemented.")
    }

    findById(id: string): Observable<ProductMongo> {
        throw new Error("Method not implemented.")
    }

    update(id: string, entity: ProductMongo): Observable<ProductMongo> {
        throw new Error("Method not implemented.")
    }

    delete(id: string): Observable<boolean> {
        throw new Error("Method not implemented.")
    }



}