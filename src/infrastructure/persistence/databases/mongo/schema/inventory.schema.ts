import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { InventoryDomain } from "../../../../../domain/models/inventory.model";
import { ProductMongo } from "./product.schema";
import { WareHouseMongo } from "./warehouse.schema";


@Schema({ collection: 'inventory', versionKey: false })
export class InventoryMongo extends InventoryDomain{ //ACA DEBO EXTENDER DE EL PRODUCTO MODELO DEL DOMINIO.


    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ProductMongo' })
    product: ProductMongo;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'WareHouseMongo' })
    warehouse: WareHouseMongo;

    @Prop({ type: String, index: true })
    level: string;

    @Prop({ type: Number, index: true })
    quantity: number;

   
}

export const InventorySchema = SchemaFactory.createForClass(InventoryMongo);

export type InventoryMongoDocument = HydratedDocument<InventoryMongo>;

