import { ProductDomain } from "src/domain/models/product.model";
import { IProductRepository } from "../../domain/i-repository/i-product.repositoty";
import { FindByIdProductUseCase } from "../use-case/product/find-by-id-product.use-case";
import { Observable } from "rxjs";


describe('FindByIdProductUseCase', () => {
  let casoUso: FindByIdProductUseCase;
  let repositorio: IProductRepository;

  beforeEach(() => {
    repositorio = {
      findById: jest.fn(),
    } as any as IProductRepository;
    casoUso = new FindByIdProductUseCase(repositorio);
  });

  it('Debe ser definido', () => {
    expect(casoUso).toBeDefined();
  });

  it('Debe llamar a repositorio.findById', (done) => {

    // Arrange
    const _id = "6425dfdc4c36025fca1771f8"

    const mockData: ProductDomain = {
      brand: "Storm",
      description: "Figure action Sub-Zero Mortal Kombat",
      price: 7080,
      photo: "https://i.pinimg.com/564x/9a/98/e4/9a98e44ae03ff88e88cc817a4f7f8e5b.jpg"
    };

    const expectedData = mockData;
    const expectedInstanceType = Observable;
    const stubFindById = jest.fn(
      () =>
        new Observable<ProductDomain>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );

    jest.spyOn(repositorio, 'findById').mockReturnValue(stubFindById());

    // Act
    const result = casoUso.execute(_id);

    // Assert
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
    expect(repositorio.findById).toHaveBeenCalledWith(_id);
  });
});
