import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { WareHouseDomain } from "../../../../../domain/models/warehouse.model";


@Schema({ collection: 'warehouse', versionKey: false })
export class WareHouseMongo extends WareHouseDomain{ //ACA DEBO EXTENDER DE EL PRODUCTO MODELO DEL DOMINIO.


    @Prop({ type: String, index: true })
    name: string;

    @Prop({ type: String, index: true })
    address: string;

    @Prop({ type: String, index: true })
    phone: string;


}

export const WareHouseSchema = SchemaFactory.createForClass(WareHouseMongo);

export type WareHouseDocument = HydratedDocument<WareHouseMongo>;

