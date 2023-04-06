import { Observable } from "rxjs";
import { WareHouseDomain } from "../models/warehouse.model";
import { InventoryDomain } from "../models/inventory.model";


export interface IInventoryRepository<Model extends InventoryDomain = InventoryDomain> {


    findAll(): Observable<Model[]>;

    create(model: Model): Observable<Model>;

    update(id: string, model: Model): Observable<Model>;
    
    delete(id: string): Observable<boolean>;


  }