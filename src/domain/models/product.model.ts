import { IProductModel } from "../interface/i-producto.model";



export class ProductDomain implements IProductModel{

    
    brand: string;
    
    description: string;

    price: number;

    photo: string;

    
  }