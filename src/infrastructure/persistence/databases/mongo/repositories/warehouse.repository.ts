import { Injectable, InternalServerErrorException } from "@nestjs/common"
import { IRepository } from "./base/repository.base"
import { WareHouseMongo, WareHouseDocument } from "../schema/WareHouse.schema"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"
import { Observable, catchError, from, map } from "rxjs"



@Injectable()
export class WareHouseMongoRepository implements IRepository<WareHouseMongo>{
    
    constructor(@InjectModel(WareHouseMongo.name) private readonly wareHouseMongo: Model<WareHouseDocument>) {

    }

    findById(id: string): Observable<WareHouseMongo> {
        return from(this.wareHouseMongo.findById(id))    
    }

    create(entity: WareHouseMongo): Observable<WareHouseMongo> {
        return from(this.wareHouseMongo.create(entity))
    }
    
    delete(_id: string): Observable<boolean> {    
        return from(this.wareHouseMongo.findByIdAndDelete(_id))
        .pipe(map(res => true));
    }

    findAll(): Observable<WareHouseMongo[]> {
        return from(this.wareHouseMongo.find())
        .pipe(map((WareHouses: WareHouseDocument[]) => { return WareHouses }))
        
    }

    update(id: string, entity: WareHouseMongo): Observable<WareHouseMongo> {   
        return from (this.wareHouseMongo.findByIdAndUpdate(id, entity, {new :true}))
        .pipe(catchError((error: Error) => {
            throw new InternalServerErrorException(`Something went wrong`)
        }))
    }

    
}