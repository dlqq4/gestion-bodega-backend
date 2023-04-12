import { Observable } from "rxjs";

import { WareHouseDomain } from "../../domain/models/warehouse.model";
import { CreateInventoryUseCase } from "../use-case/inventory/create-inventory.use-case";
import { IInventoryRepository } from "../../domain/i-repository/i-Inventory.repositoty";
import { InventoryDomain } from "../../domain/models/inventory.model";



describe('CreateInventoryUseCase', () => {
  let useCase: CreateInventoryUseCase;
  let repositorio: IInventoryRepository<InventoryDomain>;


  beforeEach(() => {
    repositorio = {
      create: jest.fn(),
    } as any as IInventoryRepository<InventoryDomain>;
    useCase = new CreateInventoryUseCase(repositorio);
  });

  it('Debe ser definido', () => {
    expect(useCase).toBeDefined();
  });

  it('should call repositorio.create', (done) => {

    // Arrange

    const wareHouse = {
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

    const mockData = {
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
    
    const expectedData = {
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


    const expectedInstanceType = Observable<WareHouseDomain>;
    const stubCreate = jest.fn(
      () =>
        new Observable<InventoryDomain>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    jest
      .spyOn(repositorio, 'create').mockReturnValue(stubCreate());


    // Act
    const result = useCase.execute(wareHouse);

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
