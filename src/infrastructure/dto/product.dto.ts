import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ProductDto {

    
    @ApiProperty({   
        example:'Matel',
        description:'The brand of the product',
    })
    @IsString()
    brand: string;

    @ApiProperty({   
        example:'Figure action Sub-Zero Mortal Kombat',
        description:'The description of the product',
    })
    @IsString()
    description: string;

    @ApiProperty({   
        example:'200',
        description:'The price of the product',
    })
    @IsNumber()
    price: number;

    @ApiProperty({   
        example:'https://i.pinimg.com/564x/40/71/9b/40719bebc8753eaf45317afb61d2e2f3.jpg',
        description:'The photo of the product',
    })
    @IsString()
    photo: string;
   
}