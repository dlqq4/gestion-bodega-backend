import { IProductRepository } from "src/domain/i-repository/i-product.repositoty";
import { DeleteProductUseCase } from "../use-case/product/delete-product.use-case";
import { Observable } from "rxjs";

describe('DeleteProductUseCase', () => {
  let casoUso: DeleteProductUseCase;
  let repositorio: IProductRepository;

  beforeEach(() => {
    repositorio = {
      delete: jest.fn(),
    } as any as IProductRepository;
    casoUso = new DeleteProductUseCase(repositorio);
  });

  it('Debe ser definido', () => {
    expect(casoUso).toBeDefined();
  });

  it('Debe llamar a repositorio.eliminar', (done) => {

    // Arrange

    const _id = "6425dfdc4c36025fca1771f8"

    const mockData = true;
    const expectedData = true;
    const expectedInstanceType = Observable<boolean>;
    const stubCreate = jest.fn(
      () =>
        new Observable<boolean>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );

    jest.spyOn(repositorio, 'delete').mockReturnValue(stubCreate());

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
  });
});
