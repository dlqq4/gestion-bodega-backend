import { Injectable } from "@nestjs/common"
import { IRepository } from "./base/repository.base"
import { Product } from "../schema/product.schema"



@Injectable()
export class ProductMongoRepository implements IRepository<Product>{
    
    
    
    findAll(): Promise<Product[]> {
        throw new Error("Method not implemented.")
    }

    findById(id: string): Promise<Product> {
        throw new Error("Method not implemented.")
    }

    create(entity: Product): Promise<Product> {
        throw new Error("Method not implemented.")
    }

    update(id: string, entity: Product): Promise<Product> {
        throw new Error("Method not implemented.")
    }

    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.")
    }



}