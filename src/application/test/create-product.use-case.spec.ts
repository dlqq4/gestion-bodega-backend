import { Observable } from "rxjs";
import { CreateProductUseCase } from "../use-case/product/create-product.use-case";
import { IProductRepository } from "../../domain/i-repository/i-product.repositoty";
import { ProductDomain } from "src/domain/models/product.model";



describe('CreateProductUseCase', () => {
  let useCase: CreateProductUseCase;
  let repositorio: IProductRepository<ProductDomain>;
  //let productDelegate: ProductDelegate;

  beforeEach(() => {
    repositorio = {
      create: jest.fn(),
    } as any as IProductRepository<ProductDomain>;
    useCase = new CreateProductUseCase(repositorio);
  });

  it('Debe ser definido', () => {
    expect(useCase).toBeDefined();
  });

  it('should call repositorio.create', (done) => {

    // Arrange

    const pedido = {
        brand: "Storm",
        description: "Figure action Sub-Zero Mortal Kombat",
        price: 7080,
        photo: "https://i.pinimg.com/564x/9a/98/e4/9a98e44ae03ff88e88cc817a4f7f8e5b.jpg"
    };

    const mockData = {
        brand: "Storm",
        description: "Figure action Sub-Zero Mortal Kombat",
        price: 7080,
        photo: "https://i.pinimg.com/564x/9a/98/e4/9a98e44ae03ff88e88cc817a4f7f8e5b.jpg"
    };
    
    const expectedData = {
        brand: "Storm",
        description: "Figure action Sub-Zero Mortal Kombat",
        price: 7080,
        photo: "https://i.pinimg.com/564x/9a/98/e4/9a98e44ae03ff88e88cc817a4f7f8e5b.jpg"
    };


    const expectedInstanceType = Observable<ProductDomain>;
    const stubCreate = jest.fn(
      () =>
        new Observable<ProductDomain>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    jest
      .spyOn(repositorio, 'create').mockReturnValue(stubCreate());


    // Act
    const result = useCase.execute(pedido);

    // Assert
    expect(repositorio.create).toHaveBeenCalledWith(mockData);
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });
});
