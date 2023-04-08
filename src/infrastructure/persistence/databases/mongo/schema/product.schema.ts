import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { ProductDomain } from "../../../../../domain/models/product.model";


@Schema({ collection: 'product', versionKey: false })
export class ProductMongo extends ProductDomain{ //ACA DEBO EXTENDER DE EL PRODUCTO MODELO DEL DOMINIO.


    @Prop({ type: String, index: true })
    brand: string;

    @Prop({ type: String, index: true })
    description: string;

    @Prop({ type: Number, index: true })
    price: number;

    @Prop({ type: String, index: true })
    photo: string;

}

export const ProductSchema = SchemaFactory.createForClass(ProductMongo);

export type ProductMongoDocument = HydratedDocument<ProductMongo>;

