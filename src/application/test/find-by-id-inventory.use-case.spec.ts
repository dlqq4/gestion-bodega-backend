
import { InventoryDomain } from 'src/domain/models/inventory.model';

import { FindByIdInventoryUseCase } from '../use-case/inventory/find-by-id-inventory.use-case';
import { Observable } from 'rxjs';
import { IInventoryRepository } from 'src/domain/i-repository/i-inventory.repositoty';

describe('FindByIdInventoryUseCase', () => {
  let useCase: FindByIdInventoryUseCase;
  let repository: IInventoryRepository;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
    } as any as IInventoryRepository;
    useCase = new FindByIdInventoryUseCase(repository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call repository.findById', (done) => {
    // Arrange
    const id = '1';
    const mockData: InventoryDomain = {
        product: {
          brand: "Marvel",
          description: "Figure action Ryu Street Fighter",
          price: 9080,
          photo: "https://i.pinimg.com/564x/2a/24/f7/2a24f77d8fb55061fbf152154a3f8a2f.jpg"
        },
        warehouse: {
          name: "Los Santos",
          address: "California, USA",
          phone: "0947890223263"
        },
        level: "HIGH",
        quantity: 200
      };
    const expectedData = mockData;
    const expectedInstanceType = Observable;

    const stubFindById = jest.fn(
      () =>
        new Observable<InventoryDomain>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );

    jest.spyOn(repository, 'findById').mockReturnValue(stubFindById());

    // Act
    const result = useCase.execute(id);

    // Assert
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
    expect(repository.findById).toHaveBeenCalledWith(id);
  });
});
