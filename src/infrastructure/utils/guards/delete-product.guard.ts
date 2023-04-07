import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';


/**
* Devuelve verdadero si la contraseña en el cuerpo de la solicitud es igual a 'chauProducto'.
*
*/
@Injectable()
export class DeleteGuard implements CanActivate {

  /**
   * Antes de pasar por el controlador debe superar el guard
   * Devuelve verdadero si la contraseña en el cuerpo de la solicitud es igual a 'chauProducto'
   * @param {ExecutionContext} context - ExecutionContext
   * @returns Un valor booleano.
   */
  canActivate(context: ExecutionContext): boolean {

    const req = context.switchToHttp().getRequest(); //llamadahttp
    const body = req.body;
    const password = body?.contra;

    return password === 'byeProduct';

  }
  
}