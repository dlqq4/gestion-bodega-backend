import { validate } from "class-validator";
import { WareHouseDto } from "../WareHouse.dto";


describe('WareHouseDto', () => {
  let dto: WareHouseDto;

  beforeEach(() => {
    dto = new WareHouseDto();
  });

  it('Debe ser definido', () => {
    expect(dto).toBeDefined();
  });

  it('Must have a name property', async () => {
    // Arrange
    const name = "Los Santos";
    const expected = "Los Santos";
    const type = "string";

    // Act
    dto.name = name;
    const errors = await validate(dto);

    // Assert
    expect(dto.name).toBeDefined(); 
    expect(dto.name).toBe(expected);
    expect(typeof dto.name).toBe(type);
    
  });

  it('Must have a address property', async () => {
    // Arrange
    const address = "Miami, USA";
    const expected = "Miami, USA";
    const type = "string";

    // Act
    dto.address = address;
    const errors = await validate(dto);

    // Assert
    expect(dto.address).toBeDefined(); 
    expect(dto.address).toBe(expected);
    expect(typeof dto.address).toBe(type);
    
  });

  it('Must have phoned property', async () => {
    // Arrange
    const phone = "3050009660028";
    const expected = "3050009660028";
    const type = "string";

    // Act
    dto.phone = phone;
    const errors = await validate(dto);

    // Assert
    expect(dto.phone).toBeDefined();
    expect(dto.phone).toBe(expected);
    expect(typeof dto.phone).toBe(type);
    
  });

});
