import {  IsNumber, IsString } from "class-validator";

export class InventoryDto {

   
    @IsString()
    product: string;

   
    @IsString()
    warehouse: string;

   
    @IsString()
    level: string;
    

    @IsNumber()
    quantity: number;
   
}