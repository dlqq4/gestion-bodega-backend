import { IInventoryModel } from "../interface/i-inventory.model";
import { IProductModel } from "../interface/i-producto.model";
import { ProductDomain } from "./product.model";
import { WareHouseDomain } from "./warehouse.model";



export class InventoryDomain implements IInventoryModel{

    
  product: ProductDomain;

  warehouse: WareHouseDomain;
    
  level: string;

  quantity: number;

    
  }