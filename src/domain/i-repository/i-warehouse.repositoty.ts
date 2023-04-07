import { Observable } from "rxjs";
import { WareHouseDomain } from "../models/warehouse.model";


export interface IWareHouseRepository<Model extends WareHouseDomain = WareHouseDomain> {


    findAll(): Observable<Model[]>;

    create(model: Model): Observable<Model>;

    update(id: string, model: Model): Observable<Model>;
    
    delete(id: string): Observable<boolean>;

    findById(id: string): Observable<Model>;


  }