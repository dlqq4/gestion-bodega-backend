import { Body, Controller, Delete, Get, Post, Put, UseGuards } from "@nestjs/common";
import { Observable } from "rxjs";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { InventoryDelegate } from "src/application/delegates/Inventory.delegate";
import { InventoryEntityInfra } from "../persistence/entities/Inventory.entity";
import { InventoryService } from "../persistence/services/Inventory.service";



@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController {

    private readonly useCase: InventoryDelegate

    /**
     * La función constructora es una función especial que se llama cuando se crea un objeto a partir
     * de una clase.
     * @param {InventoryoRepositorio} InventoryoRepositorio - InventoryoRepositorio
     */
    constructor(private readonly inventoryService : InventoryService) {

        this.useCase = new InventoryDelegate(this.inventoryService);

    }

    
    @ApiOperation({ summary: 'Create a new Inventory' })
    @Post('create-inventory')
    crear(@Body() Inventory: InventoryEntityInfra) : Observable<InventoryEntityInfra> {
        this.useCase.toCreateInventory()
        return this.useCase.execute(Inventory)
    }


    @ApiOperation({ summary: 'Delete to Inventory' })
    @Delete('delete-inventory')
    eliminar(@Body() id : string) : Observable <boolean>  {
        this.useCase.toDeleteInventory()
        return this.useCase.execute(id);
    }


    @ApiOperation({ summary: 'Update to Inventory' })
    @Put('update-inventory')
    actualizar(@Body() id : string, @Body() Inventory : InventoryEntityInfra) : Observable<InventoryEntityInfra> {
        this.useCase.toUpdateInventory()
        return this.useCase.execute(id, Inventory)
    }

     
    @ApiOperation({ summary: 'Search to all Inventory' })
    @Get('find-all-inventory')
    buscarTodos() : Observable <InventoryEntityInfra[]>  {
        this.useCase.toFindInventory()
        return this.useCase.execute()
    }

    

}