import { IProductModel } from "./i-producto.model";
import { IWareHouseModel } from "./i-warehouse.model";


export interface IInventoryModel {

    product: IProductModel;

    warehouse: IWareHouseModel;
    
    level: string;

    quantity: number;


}