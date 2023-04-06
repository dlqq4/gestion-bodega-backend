import { Body, Controller, Delete, Get, Post, Put, UseGuards } from "@nestjs/common";
import { ProductoDto } from "../dto/producto-dto";

import { Observable } from "rxjs";
import { ApiOperation, ApiTags } from "@nestjs/swagger";


/** 
*La clase ProductoControlador es una clase de controlador que usa la clase ProductoRepositorio para
*crear, actualizar, eliminar y encontrar todos los productos.
* @param cocinaRepo - ICocinaRepositorio<CocinaModelo>
*/
@ApiTags('producto')
@Controller('producto')
export class ProductControlador {

    /**
     * La función constructora es una función especial que se llama cuando se crea un objeto a partir
     * de una clase.
     * @param {ProductoRepositorio} productoRepositorio - ProductoRepositorio
     */
    constructor(private readonly productoRepositorio : ProductoRepositorio) {

    }

   
    /**
     * Crea un nuevo producto.
     * @param {ProductoDto} producto - ProductoDto
     * @returns {Observable<ProductoModelo>} Un Observable de ProductoModelo
     */
    @ApiOperation({ summary: 'Crea un producto' })
    @Post('create-producto')
    crear(@Body() producto: ProductoDto) : Observable<ProductoModelo> {
        const casoUso = new CrearProductoCasoDeUso(this.productoRepositorio);
        return casoUso.execute(producto)
    }


    
    /**
     * La función actualizar() toma una cadena y un objeto ProductoDto, y devuelve un Observable de
     * tipo ProductoModelo.
     * @param {string} _id - cadena
     * @param {ProductoDto} producto - ProductoDto
     * @returns {Observable<ProductoModelo>} El retorno es un Observable de ProductoModelo.
     */
    @ApiOperation({ summary: 'Actualiza un producto' })
    @Put('actualizar-producto')
    actualizar(@Body() _id : string, @Body() producto : ProductoDto) : Observable<ProductoModelo> {
        const casoUso = new ActualizarProductoCasoDeUso(this.productoRepositorio);
        return casoUso.execute(_id, producto)
    }

    
    
    /**
     * Esta función devuelve un Observable de un arreglo de objetos de ProductoModelo.
     * @returns {Observable <ProductoModelo[]>} Observable <ProductoModelo[]>
     */
    @ApiOperation({ summary: 'Busca todos los productos' })
    @Get('buscar-todos')
    buscarTodos() : Observable <ProductoModelo[]>  {
        const casoUso = new BuscarTodosCasoDeUso(this.productoRepositorio);
        return casoUso.execute();
    }
    
    
    /**
     * La función eliminar() recibe una id de string como parámetro y
     * devuelve un Observable de tipo booleano.
     * @param {string} _id - string
     * @returns {Observable <boolean>} El resultado de la ejecución del caso de uso.
     */
    @ApiOperation({ summary: 'Elimina un producto' })
    @UseGuards(EliminarGuard)
    @Delete('eliminar-producto')
    eliminar(@Body() _id : string) : Observable <boolean>  {
        const casoUso = new EliminarProductoCasoDeUso(this.productoRepositorio);
        return casoUso.execute(_id);
    }
    


}