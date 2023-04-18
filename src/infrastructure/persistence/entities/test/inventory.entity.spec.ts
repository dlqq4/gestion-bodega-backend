import { InventoryMongo } from "../../databases/mongo/schema/inventory.schema";
import { InventoryEntityInfra } from "../inventory.entity";


describe('InventoryEntityInfra', () => {
  it('should extend InventoryMongo', () => {
    const entity = new InventoryEntityInfra();
    expect(entity).toBeInstanceOf(InventoryMongo);
  });
});