import { validate } from "class-validator";
import { InventoryDto } from "../Inventory.dto";


describe('InventoryDto', () => {
  let dto: InventoryDto;

  beforeEach(() => {
    dto = new InventoryDto();
  });

  it('Debe ser definido', () => {
    expect(dto).toBeDefined();
  });

  it('Must have a product property', async () => {
    // Arrange
    const product = "642f658515ea2d5196948be6";
    const expected = "642f658515ea2d5196948be6";
    const type = "string";

    // Act
    dto.product = product;
    const errors = await validate(dto);

    // Assert
    expect(dto.product).toBeDefined(); 
    expect(dto.product).toBe(expected);
    expect(typeof dto.product).toBe(type);
    
  });

  it('Must have a warehouse property', async () => {
    // Arrange
    const warehouse = "642f4085235dc7d9d0120519";
    const expected = "642f4085235dc7d9d0120519";
    const type = "string";

    // Act
    dto.warehouse = warehouse;
    const errors = await validate(dto);

    // Assert
    expect(dto.warehouse).toBeDefined(); // QUE EXISTA
    expect(dto.warehouse).toBe(expected);
    expect(typeof dto.warehouse).toBe(type);
    
  });

  it('Must have leveld property', async () => {
    // Arrange
    const level = "LOW";
    const expected = "LOW";
    const type = "string";

    // Act
    dto.level = level;
    const errors = await validate(dto);

    // Assert
    expect(dto.level).toBeDefined();
    expect(dto.level).toBe(expected);
    expect(typeof dto.level).toBe(type);
    
  });

  it('Debe tener una propiedad de quantity', async () => {
    // Arrange
    const quantity = 200;
    const expected = 200;
    const type = "number";

    // Act
    dto.quantity = quantity;
    const errors = await validate(dto);

    // Assert
    expect(dto.quantity).toBeDefined(); // QUE EXISTA
    expect(dto.quantity).toBe(expected);
    expect(typeof dto.quantity).toBe(type);
   
  });
});
