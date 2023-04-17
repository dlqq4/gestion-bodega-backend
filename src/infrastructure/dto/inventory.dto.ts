import {  IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class InventoryDto {

    
    @ApiProperty({   
        example:'643834d5595ec1e6281fc7e6',
        description:'The id of the product',
    })
    @IsString()
    product: string;

    @ApiProperty({   
        example:'6436f3a786698ee0a7722704',
        description:'The id of the warehouse',
    })
    @IsString()
    warehouse: string;

    @ApiProperty({   
        example:'LOW',
        description:'The level of the inventory',
    })
    @IsString()
    level: string;
    
    @ApiProperty({   
        example:'200',
        description:'The quantity of the inventory',
    })
    @IsNumber()
    quantity: number;
   
}