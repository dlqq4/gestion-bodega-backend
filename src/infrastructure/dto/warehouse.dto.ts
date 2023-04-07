import {  IsString } from "class-validator";

export class WareHouseDto {

   
    @IsString()
    name: string;

   
    @IsString()
    address: string;

   
    @IsString()
    phone: string;
   
}