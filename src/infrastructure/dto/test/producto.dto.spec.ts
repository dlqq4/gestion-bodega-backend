import { validate } from "class-validator";
import { ProductDto } from "../product.dto";


describe('ProductDto', () => {
  let dto: ProductDto;

  beforeEach(() => {
    dto = new ProductDto();
  });

  it('Debe ser definido', () => {
    expect(dto).toBeDefined();
  });

  it('Must have a brand property', async () => {
    // Arrange
    const brand = "Storm";
    const expected = "Storm";
    const type = "string";

    // Act
    dto.brand = brand;
    const errors = await validate(dto);

    // Assert
    expect(dto.brand).toBeDefined(); 
    expect(dto.brand).toBe(expected);
    expect(typeof dto.brand).toBe(type);
    
  });

  it('Must have a description property', async () => {
    // Arrange
    const description = "Figure action Sub-Zero Mortal Kombat";
    const expected = "Figure action Sub-Zero Mortal Kombat";
    const type = "string";

    // Act
    dto.description = description;
    const errors = await validate(dto);

    // Assert
    expect(dto.description).toBeDefined(); // QUE EXISTA
    expect(dto.description).toBe(expected);
    expect(typeof dto.description).toBe(type);
    
  });

  it('Must have priced property', async () => {
    // Arrange
    const price = 700;
    const expected = 700;
    const type = "number";

    // Act
    dto.price = price;
    const errors = await validate(dto);

    // Assert
    expect(dto.price).toBeDefined();
    expect(dto.price).toBe(expected);
    expect(typeof dto.price).toBe(type);
    
  });

  it('Debe tener una propiedad de photo', async () => {
    // Arrange
    const photo = "https://i.pinimg.com/564x/9a/98/e4/9a98e44ae03ff88e88cc817a4f7f8e5b.jpg";
    const expected = "https://i.pinimg.com/564x/9a/98/e4/9a98e44ae03ff88e88cc817a4f7f8e5b.jpg";
    const type = "string";

    // Act
    dto.photo = photo;
    const errors = await validate(dto);

    // Assert
    expect(dto.photo).toBeDefined(); // QUE EXISTA
    expect(dto.photo).toBe(expected);
    expect(typeof dto.photo).toBe(type);
   
  });
});
