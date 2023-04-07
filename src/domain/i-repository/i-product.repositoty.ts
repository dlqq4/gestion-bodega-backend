import { Observable } from "rxjs";
import { ProductDomain } from "../models/product.model";


export interface IProductRepository<Model extends ProductDomain = ProductDomain> {


    findAll(): Observable<Model[]>;

    create(model: Model): Observable<Model>;

    update(id: string, model: Model): Observable<Model>;
    
    delete(id: string): Observable<boolean>;

    findById(id: string): Observable<Model>;


  }