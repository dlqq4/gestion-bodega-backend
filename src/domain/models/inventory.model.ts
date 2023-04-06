import { IInventoryModel } from "../interface/i-inventory.model";
import { IProductModel } from "../interface/i-producto.model";



export class InventoryDomain implements IInventoryModel{

    
  product: string;
    
  level: string;

  quantity: string;

    
  }