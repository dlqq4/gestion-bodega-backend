
import { of } from 'rxjs';
import { UpdateInventoryQuantityUseCase } from '../use-case/inventory/update-inventory-quantity.use-case';
import { IInventoryRepository } from 'src/domain/i-repository/i-inventory.repositoty';
import { InventoryDomain } from 'src/domain/models/inventory.model';

describe('UpdateInventoryQuantityUseCase', () => {
  let useCase: UpdateInventoryQuantityUseCase;
  let repository: IInventoryRepository;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
      update: jest.fn(),
    } as any as IInventoryRepository;
    useCase = new UpdateInventoryQuantityUseCase(repository);
  });

  it('should update inventory quantity and level', (done) => {
    // Arrange
    const id = 'inventory-id';
    const foundInventory: InventoryDomain = {
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
    const newInventory: InventoryDomain = {
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
    jest.spyOn(repository, 'findById').mockReturnValue(of(foundInventory));
    jest.spyOn(repository, 'update').mockReturnValue(of(expectedInventory));

    // Act
    const result = useCase.execute(id, newInventory);

    // Assert
    result.subscribe((inventory) => {
      expect(repository.findById).toHaveBeenCalledWith(id);
      expect(repository.update).toHaveBeenCalledWith(id, expectedInventory);
      expect(inventory).toEqual(expectedInventory);
      done();
    });
  });
});
