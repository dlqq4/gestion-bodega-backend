import { WareHouseMongo } from "../../databases/mongo/schema/warehouse.schema";
import { WareHouseEntityInfra } from "../warehouse.entity";


describe('WareHouseEntityInfra', () => {
  it('should extend WareHouseMongo', () => {
    const warehouseEntity = new WareHouseEntityInfra();
    expect(warehouseEntity).toBeInstanceOf(WareHouseMongo);
  });
});