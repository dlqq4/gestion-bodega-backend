import { Injectable, InternalServerErrorException } from "@nestjs/common"
import { IRepository } from "./base/repository.base"
import { InventoryMongo, InventoryMongoDocument } from "../schema/Inventory.schema"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"
import { Observable, catchError, from, map } from "rxjs"



@Injectable()
export class InventoryMongoRepository implements IRepository<InventoryMongo>{
    
    constructor(@InjectModel(InventoryMongo.name) private readonly inventoryRepo: Model<InventoryMongoDocument>) {

    }


    findById(id: string): Observable<InventoryMongo> {
        return from(this.inventoryRepo.findById(id))    
    }

    create(entity: InventoryMongo): Observable<InventoryMongo> {
        return from(this.inventoryRepo.create(entity))
    }
    
    delete(_id: string): Observable<boolean> {    
        return from(this.inventoryRepo.findByIdAndDelete(_id))
        .pipe(map(res => true));
    }

    findAll(): Observable<InventoryMongo[]> {
        return from(this.inventoryRepo.find()
        .populate("product")
        .populate("warehouse"))
        .pipe(map((Inventorys: InventoryMongoDocument[]) => { return Inventorys }))
        
    }

    update(id: string, entity: InventoryMongo): Observable<InventoryMongo> {   
        return from (this.inventoryRepo.findByIdAndUpdate(id, entity, {new :true}))
        .pipe(catchError((error: Error) => {
            throw new InternalServerErrorException(`Something went wrong`)
        }))
    }

    
}