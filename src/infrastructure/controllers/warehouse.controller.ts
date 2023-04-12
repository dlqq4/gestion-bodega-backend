import { Body, Controller, Delete, Get, Post, Put, UseGuards } from "@nestjs/common";
import { Observable } from "rxjs";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { WareHouseDelegate } from "../../application/delegates/warehouse.delegate";
import { WareHouseEntityInfra } from "../../infrastructure/persistence/entities/warehouse.entity";
import { WareHouseService } from "../../infrastructure/persistence/services/warehouse.service";
import { WareHouseDto } from "../dto/warehouse.dto";



@ApiTags('WareHouse')
@Controller('warehouse')
export class WareHouseController {

    private readonly useCase: WareHouseDelegate

    /**
     * La función constructora es una función especial que se llama cuando se crea un objeto a partir
     * de una clase.
     * @param {WareHouseoRepositorio} WareHouseoRepositorio - WareHouseoRepositorio
     */
    constructor(private readonly wareHouseService : WareHouseService) {

        this.useCase = new WareHouseDelegate(this.wareHouseService);

    }

    
    @ApiOperation({ summary: 'Create a new WareHouse' })
    @Post('create-wareHouse')
    create(@Body() WareHouse: WareHouseDto) : Observable<WareHouseEntityInfra> {
        this.useCase.toCreateWareHouse()
        return this.useCase.execute(WareHouse)
    }


    @ApiOperation({ summary: 'Delete to WareHouse' })
    @Delete('delete-wareHouse')
    delete(@Body() id : string) : Observable <boolean>  {
        this.useCase.toDeleteWareHouse()
        return this.useCase.execute(id);
    }


    @ApiOperation({ summary: 'Update to WareHouse' })
    @Put('update-wareHouse')
    update(@Body() id : string, @Body() WareHouse : WareHouseDto) : Observable<WareHouseEntityInfra> {
        this.useCase.toUpdateWareHouse()
        return this.useCase.execute(id, WareHouse)
    }

     
    @ApiOperation({ summary: 'Search to all WareHouse' })
    @Get('find-all-wareHouse')
    findAll() : Observable <WareHouseEntityInfra[]>  {
        this.useCase.toFindWareHouse()
        return this.useCase.execute()
    }

    
     @Get('find-by-id')
    findById(@Body() id: string): Observable<WareHouseEntityInfra> {
        this.useCase.toFindByIdWareHouse()
        return this.useCase.execute(id);
    }
    

}