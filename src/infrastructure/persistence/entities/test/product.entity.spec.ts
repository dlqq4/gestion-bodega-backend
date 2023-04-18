import { ProductMongo } from "../../databases/mongo/schema/product.schema";
import { ProductEntityInfra } from "../product.entity";


describe('ProductEntityInfra', () => {
  it('should extend ProductMongo', () => {
    const productEntity = new ProductEntityInfra();
    expect(productEntity).toBeInstanceOf(ProductMongo);
  });
});
