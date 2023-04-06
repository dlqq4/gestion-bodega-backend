import { IProductModel } from "../interface/i-producto.model";
import { IWareHouseModel } from "../interface/i-warehouse.model";



export class WareHouseDomain implements IWareHouseModel{
  
    name: string;

    address: string;
    
    phone: string;

    
  }