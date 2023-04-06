import { Injectable, InternalServerErrorException } from "@nestjs/common"
import { IRepository } from "./base/repository.base"
import { ProductMongo, ProductMongoDocument } from "../schema/product.schema"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"
import { Observable, catchError, from, map } from "rxjs"



@Injectable()
export class ProductMongoRepository implements IRepository<ProductMongo>{
    
    constructor(@InjectModel(ProductMongo.name) private readonly productRepo: Model<ProductMongoDocument>) {

    }

    create(entity: ProductMongo): Observable<ProductMongo> {
        return from(this.productRepo.create(entity))
    }
    
    delete(_id: string): Observable<boolean> {    
        return from(this.productRepo.findByIdAndDelete(_id))
        .pipe(map(res => true));
    }

    findAll(): Observable<ProductMongo[]> {
        return from(this.productRepo.find())
        .pipe(map((products: ProductMongoDocument[]) => { return products }))
        
    }

    update(id: string, entity: ProductMongo): Observable<ProductMongo> {   
        return from (this.productRepo.findByIdAndUpdate(id, entity, {new :true}))
        .pipe(catchError((error: Error) => {
            throw new InternalServerErrorException(`Something went wrong`)
        }))
    }

    
}