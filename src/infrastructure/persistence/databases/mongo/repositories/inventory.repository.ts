import { Injectable, InternalServerErrorException } from "@nestjs/common"
import { IRepository } from "./base/repository.base"
import { InventoryMongo, InventoryMongoDocument } from "../schema/Inventory.schema"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"
import { Observable, catchError, from, map } from "rxjs"



@Injectable()
export class InventoryMongoRepository implements IRepository<InventoryMongo>{
    
    constructor(@InjectModel(InventoryMongo.name) private readonly InventoryRepo: Model<InventoryMongoDocument>) {

    }

    create(entity: InventoryMongo): Observable<InventoryMongo> {
        return from(this.InventoryRepo.create(entity))
    }
    
    delete(_id: string): Observable<boolean> {    
        return from(this.InventoryRepo.findByIdAndDelete(_id))
        .pipe(map(res => true));
    }

    findAll(): Observable<InventoryMongo[]> {
        return from(this.InventoryRepo.find())
        .pipe(map((Inventorys: InventoryMongoDocument[]) => { return Inventorys }))
        
    }

    update(id: string, entity: InventoryMongo): Observable<InventoryMongo> {   
        return from (this.InventoryRepo.findByIdAndUpdate(id, entity, {new :true}))
        .pipe(catchError((error: Error) => {
            throw new InternalServerErrorException(`Something went wrong`)
        }))
    }

    
}