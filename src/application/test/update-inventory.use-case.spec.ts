import { of } from 'rxjs';
import { UpdateInventoryUseCase } from '../use-case/inventory/update-inventory.use-case';
import { IInventoryRepository } from 'src/domain/i-repository/i-inventory.repositoty';
import { InventoryDomain } from 'src/domain/models/inventory.model';

describe('UpdateInventoryUseCase', () => {
  let useCase: UpdateInventoryUseCase;
  let repository: IInventoryRepository;

  beforeEach(() => {
    repository = {
      update: jest.fn(),
    } as any as IInventoryRepository;
    useCase = new UpdateInventoryUseCase(repository);
  });

  it('should update inventory', (done) => {
    // Arrange
    const id = 'inventory-id';
    const inventory: InventoryDomain = {
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
    const expectedInventory: InventoryDomain = {
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
    jest.spyOn(repository, 'update').mockReturnValue(of(expectedInventory));

    // Act
    const result = useCase.execute(id, inventory);

    // Assert
    result.subscribe((updatedInventory) => {
      expect(repository.update).toHaveBeenCalledWith(id, inventory);
      expect(updatedInventory).toEqual(expectedInventory);
      done();
    });
  });
});
