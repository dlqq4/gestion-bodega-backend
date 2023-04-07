import { IsNumber, IsString } from "class-validator";

export class ProductDto {

   
    @IsString()
    brand: string;

   
    @IsString()
    description: string;

    
    @IsNumber()
    price: number;

   
    @IsString()
    photo: string;
   
}