import { Injectable } from "@nestjs/common";
import { MongooseOptionsFactory } from "@nestjs/mongoose";
import { MongooseModuleOptions } from "@nestjs/mongoose/dist";


/**
* Es una clase modulo que implementa la interfaz MongooseOptionsFactory.
*
*/
@Injectable()
export class MongoConfigService implements MongooseOptionsFactory {


   /**
    * Esta función devuelve un objeto MongooseModuleOptions con las propiedades uri,
    * authSource y dbName establecidas en los valores especificados en la función.
    * @returns El objeto MongooseModuleOptions.
    */
    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
        return {uri: 'mongodb://127.0.0.1:27017', authSource: 'admin', dbName: 'Bodega'};
    }

    
}