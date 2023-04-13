import { Body, Controller, Delete, Get, Post, Put, UseGuards } from "@nestjs/common";
import { Observable } from "rxjs";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { InventoryDelegate } from "../../application/delegates/inventory.delegate";
import { InventoryEntityInfra } from "../../infrastructure/persistence/entities/inventory.entity";
//import { InventoryService } from "../persistence/services/Inventory.service";
import { InventoryService } from "../../infrastructure/persistence/services/inventory.service";
import { InventoryDto } from "../dto/inventory.dto";



@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController {

    private readonly useCase: InventoryDelegate

    /**
     * La función constructora es una función especial que se llama cuando se crea un objeto a partir
     * de una clase.
     * @param {InventoryoRepositorio} InventoryoRepositorio - InventoryoRepositorio
     */
    constructor(private readonly inventoryService: InventoryService) {

        this.useCase = new InventoryDelegate(this.inventoryService);

    }


    @ApiOperation({ summary: 'Create a new Inventory' })
    @Post('create-inventory')
    create(@Body() Inventory: InventoryDto): Observable<InventoryEntityInfra> {
        this.useCase.toCreateInventory()
        return this.useCase.execute(Inventory)
    }


    @ApiOperation({ summary: 'Delete to Inventory' })
    @Post('delete-inventory')
    delete(@Body() id: string): Observable<boolean> {
        this.useCase.toDeleteInventory()
        return this.useCase.execute(id);
    }


    @ApiOperation({ summary: 'Search to all Inventory' })
    @Get('find-all-inventory')
    findAll(): Observable<InventoryEntityInfra[]> {
        this.useCase.toFindInventory()
        return this.useCase.execute()
    }


    @Get('find-by-id')
    findById(@Body() id: string): Observable<InventoryEntityInfra> {
        this.useCase.toFindByIdInventory()
        return this.useCase.execute(id);
    }

    

    @ApiOperation({ summary: 'Update to Inventory' })
    @Put('update-inventory')
    update(@Body() id: string, @Body() Inventory: InventoryDto): Observable<InventoryEntityInfra> {
        this.useCase.toUpdateInventory()
        return this.useCase.execute(id, Inventory)
    }

    //************************************************************************************/
    //********************************COMPLEX USE CASES***********************************/

    /**
     * ESTE METODO SOLO PIDE ID Y SETEA EL LEVEL SEGUN QUANTITY
     * @param inventoryData 
     * @returns 
     */
    @Put('level')
    setInventoryLevel(@Body() inventoryData: { id: string }): Observable<string> {
        const { id } = inventoryData;
        this.useCase.toSetLevelInventory()
        return this.useCase.execute(id);
    }


    /**
     * ESTE METODO PIDE ID DE INVENTORY Y QUANTITY LUEGO SETEA LEVEL SEGUN QUANTITY
     * @param id 
     * @param Inventory 
     * @returns 
     */
    @ApiOperation({ summary: 'Update Inventory Quantity and Level' })
    @Put('update-quantity-and-level')
    updateQuantityInventory(@Body() id: string, @Body() Inventory: InventoryDto): Observable<InventoryEntityInfra> {
        const { quantity } = Inventory;
        this.useCase.toUpdateQuantityInventory();
        return this.useCase.execute(id, { quantity } as InventoryEntityInfra);
    }

    /**
     * AL HACER UNA BUSQUEDA POR ID DEVUELVE UN ALERTA SOBRE EL ESTADO DEL LEVEL
     * @param id 
     * @returns 
     */
    @Get('inventory-alert')
    lowInventoryAlert(@Body() id: string): Observable<string> {
        this.useCase.toLowInventoryAlert()
        return this.useCase.execute(id);
    }




}