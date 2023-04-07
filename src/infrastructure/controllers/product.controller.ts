import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { Observable } from "rxjs";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ProductDelegate } from "src/application/delegates/product.delegate";
import { ProductEntityInfra } from "../persistence/entities/product.entity";
import { ProductService } from "../persistence/services/product.service";
import { ProductDto } from "../dto/product.dto";
import { DeleteGuard } from "../utils/guards/delete-product.guard";



@ApiTags('product')
@Controller('product')
export class ProductController {

    private readonly useCase: ProductDelegate

    /**
     * La función constructora es una función especial que se llama cuando se crea un objeto a partir
     * de una clase.
     * @param {ProductoRepositorio} productoRepositorio - ProductoRepositorio
     */
    constructor(private readonly productService: ProductService) {

        this.useCase = new ProductDelegate(this.productService);

    }


    @ApiOperation({ summary: 'Create a new product' })
    @Post('create-product')
    crear(@Body() product: ProductDto): Observable<ProductEntityInfra> {
        this.useCase.toCreateProduct()
        return this.useCase.execute(product)
    }


    @ApiOperation({ summary: 'Delete to product' })
    @UseGuards(DeleteGuard)
    @Delete('delete-product')
    eliminar(@Body() id: string): Observable<boolean> {
        this.useCase.toDeleteProduct()
        return this.useCase.execute(id);
    }


    @ApiOperation({ summary: 'Update to product' })
    @Put('update-product')
    actualizar(@Body() id: string, @Body() product: ProductDto): Observable<ProductEntityInfra> {
        this.useCase.toUpdateProduct()
        return this.useCase.execute(id, product)
    }


    @ApiOperation({ summary: 'Search to all product' })
    @Get('find-all-product')
    buscarTodos(): Observable<ProductEntityInfra[]> {
        this.useCase.toFindProduct()
        return this.useCase.execute()
    }

    
    
    @Get('find-by-id')
    findById(@Body() id: string): Observable<ProductEntityInfra> {
        this.useCase.toFindByIdProduct()
        return this.useCase.execute(id);
    }
    
    


}