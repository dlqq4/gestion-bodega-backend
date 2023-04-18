import { ProductDomain } from "src/domain/models/product.model";
import { IProductRepository } from "../../domain/i-repository/i-product.repositoty";
import { FindProductUseCase } from "../use-case/product/find-product.use-case";
import { Observable } from "rxjs";


describe('FindProductUseCase', () => {
  let casoUso: FindProductUseCase;
  let repositorio: IProductRepository;

  beforeEach(() => {
    repositorio = {
      findAll: jest.fn(),
    } as any as IProductRepository;
    casoUso = new FindProductUseCase(repositorio);
  });

  it('Debe ser definido', () => {
    expect(casoUso).toBeDefined();
  });

  it('Debe llamar a repositorio.findAll', (done) => {

    // Arrange
    const mockData: ProductDomain[] = [
        {
            brand: "Storm",
            description: "Figure action Sub-Zero Mortal Kombat",
            price: 7080,
            photo: "https://i.pinimg.com/564x/9a/98/e4/9a98e44ae03ff88e88cc817a4f7f8e5b.jpg"
        },
        {
            brand: "Storm",
            description: "Figure action Sub-Zero Mortal Kombat",
            price: 7080,
            photo: "https://i.pinimg.com/564x/9a/98/e4/9a98e44ae03ff88e88cc817a4f7f8e5b.jpg"
        },
    ];
    const expectedData = mockData;
    const expectedInstanceType = Observable;
    const stubFindAll = jest.fn(
      () =>
        new Observable<ProductDomain[]>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );

    jest.spyOn(repositorio, 'findAll').mockReturnValue(stubFindAll());

    // Act
    const result = casoUso.execute();

    // Assert
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
    expect(repositorio.findAll).toHaveBeenCalled();
  });
});
