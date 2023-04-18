import { of } from 'rxjs';
import { UpdateProductUseCase } from '../use-case/product/update-product.use-case';
import { ProductDomain } from 'src/domain/models/product.model';
import { IProductRepository } from 'src/domain/i-repository/i-product.repositoty';

describe('UpdateProductUseCase', () => {
  let useCase: UpdateProductUseCase;
  let repository: IProductRepository;

  beforeEach(() => {
    repository = {
      update: jest.fn(),
    } as any as IProductRepository;
    useCase = new UpdateProductUseCase(repository);
  });

  it('should update product', (done) => {
    // Arrange
    const id = 'product-id';
    const product: ProductDomain = {
      brand: "Apple",
      description: "MacBook Pro",
      price: 1999,
      photo: "https://www.apple.com/v/mac/home/am/images/overview/hero/macbook_pro__f6ey2myoyc62_large.jpg"
    };
    const expectedProduct: ProductDomain = {
      brand: "Apple",
      description: "MacBook Pro",
      price: 1999,
      photo: "https://www.apple.com/v/mac/home/am/images/overview/hero/macbook_pro__f6ey2myoyc62_large.jpg"
    };
    jest.spyOn(repository, 'update').mockReturnValue(of(expectedProduct));

    // Act
    const result = useCase.execute(id, product);

    // Assert
    result.subscribe((updatedProduct) => {
      expect(repository.update).toHaveBeenCalledWith(id, product);
      expect(updatedProduct).toEqual(expectedProduct);
      done();
    });
  });
});
