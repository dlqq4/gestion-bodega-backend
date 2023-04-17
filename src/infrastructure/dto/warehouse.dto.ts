import {  IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class WareHouseDto {

    
    @ApiProperty({   
        example:'Los Santos',
        description:'The name of the warehouse',
    })
    @IsString()
    name: string;

    
    @ApiProperty({   
        example:'Los Angeles, USA',
        description:'The address of the warehouse',
    })
    @IsString()
    address: string;

    @ApiProperty({   
        example:'096325698715',
        description:'The phone of the warehouse',
    })
    @IsString()
    phone: string;
   
}