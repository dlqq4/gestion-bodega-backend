import { Body, Controller, Delete, Get, Post, Put, UseGuards } from "@nestjs/common";
import { Observable } from "rxjs";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ProductDelegate } from "src/application/delegates/product.delegate";
import { ProductMongoRepository } from "../persistence/databases/mongo/repositories/product.repository";
import { ProductEntityInfra } from "../persistence/entities/product.entity";
import { ProductService } from "../persistence/services/product.service";



@ApiTags('product')
@Controller('product')
export class ProductController {

    private readonly useCase: ProductDelegate

    /**
     * La función constructora es una función especial que se llama cuando se crea un objeto a partir
     * de una clase.
     * @param {ProductoRepositorio} productoRepositorio - ProductoRepositorio
     */
    constructor(private readonly productService : ProductService) {

        this.useCase = new ProductDelegate(this.productService);

    }

    
    @ApiOperation({ summary: 'Create a new product' })
    @Post('create-product')
    crear(@Body() product: ProductEntityInfra) : Observable<ProductEntityInfra> {
        this.useCase.toCreateProduct()
        return this.useCase.execute(product)
    }


    /*

    @ApiOperation({ summary: 'Actualiza un producto' })
    @Put('actualizar-producto')
    actualizar(@Body() _id : string, @Body() producto : ProductoDto) : Observable<ProductoModelo> {
        const casoUso = new ActualizarProductoCasoDeUso(this.productoRepositorio);
        return casoUso.execute(_id, producto)
    }

    
    
    
    @ApiOperation({ summary: 'Busca todos los productos' })
    @Get('buscar-todos')
    buscarTodos() : Observable <ProductoModelo[]>  {
        const casoUso = new BuscarTodosCasoDeUso(this.productoRepositorio);
        return casoUso.execute();
    }
    
    
    @ApiOperation({ summary: 'Elimina un producto' })
    @UseGuards(EliminarGuard)
    @Delete('eliminar-producto')
    eliminar(@Body() _id : string) : Observable <boolean>  {
        const casoUso = new EliminarProductoCasoDeUso(this.productoRepositorio);
        return casoUso.execute(_id);
    }
    
    */


}