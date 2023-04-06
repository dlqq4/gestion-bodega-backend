import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";


@Schema({ collection: 'product', versionKey: false })
export class ProductMongo { //ACA DEBO EXTENDER DE EL PRODUCTO MODELO DEL DOMINIO.


    @Prop({ type: String, index: true })
    brand: string;

    @Prop({ type: String, index: true })
    description: string;

    @Prop({ type: Number, index: true })
    price: string;

    @Prop({ type: String, index: true })
    photo: string;

}

export const ProductSchema = SchemaFactory.createForClass(ProductMongo);

export type ProductDocument = HydratedDocument<ProductMongo>;

