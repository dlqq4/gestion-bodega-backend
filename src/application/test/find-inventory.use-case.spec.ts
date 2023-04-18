import { IInventoryRepository } from "src/domain/i-repository/i-inventory.repositoty";
import { InventoryDomain } from "../../domain/models/inventory.model";
import { FindInventoryUseCase } from "../use-case/inventory/find-inventory.use-case";
import { Observable } from "rxjs";

describe('FindInventoryUseCase', () => {
  let casoUso: FindInventoryUseCase;
  let repositorio: IInventoryRepository;

  beforeEach(() => {
    repositorio = {
      findAll: jest.fn(),
    } as any as IInventoryRepository;
    casoUso = new FindInventoryUseCase(repositorio);
  });

  it('Debe ser definido', () => {
    expect(casoUso).toBeDefined();
  });

  it('Debe llamar a repositorio.findAll', (done) => {

    // Arrange
    const mockData: InventoryDomain[] = [
        {
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
          },
          {
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
          },
    ];
    const expectedData = mockData;
    const expectedInstanceType = Observable;
    const stubFindAll = jest.fn(
      () =>
        new Observable<InventoryDomain[]>((subscriber) => {
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
