
import { of, throwError } from 'rxjs';
import { SetInventoryLevelByIdUseCase } from '../use-case/inventory/set-inventory-level.use-case';
import { InventoryDomain } from 'src/domain/models/inventory.model';


describe('SetInventoryLevelByIdUseCase', () => {
  let inventoryRepositoryMock;
  let useCase: SetInventoryLevelByIdUseCase;

  beforeEach(() => {
    inventoryRepositoryMock = {
      findById: jest.fn(),
      update: jest.fn(),
    };
    useCase = new SetInventoryLevelByIdUseCase(inventoryRepositoryMock);
  });

  it('should throw an error if inventory is not found', (done) => {
    inventoryRepositoryMock.findById.mockReturnValue(throwError(new Error('Inventory not found')));

    useCase.execute('123').subscribe({
      error: (err) => {
        expect(err.message).toBe('Inventory not found');
        done();
      },
    });
  });

  it('should set the inventory level to low when quantity is less than 10', (done) => {

    const _id = '642fa2f610712d642de460b3';

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
        quantity: 2
      };
    inventoryRepositoryMock.findById.mockReturnValue(of(inventory));
    inventoryRepositoryMock.update.mockReturnValue(of(undefined));

    useCase.execute('642fa2f610712d642de460b3').subscribe((result) => {
      expect(inventory.level).toBe('low');
      expect(result).toBe('Inventory level updated successfully');
      done();
    });
  });

  it('should set the inventory level to medium when quantity is between 10 and 19', (done) => {
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
        quantity: 15
      };
    inventoryRepositoryMock.findById.mockReturnValue(of(inventory));
    inventoryRepositoryMock.update.mockReturnValue(of(undefined));

    useCase.execute('642fa2f610712d642de460b3').subscribe((result) => {
      expect(inventory.level).toBe('medium');
      expect(result).toBe('Inventory level updated successfully');
      done();
    });
  });

  it('should set the inventory level to high when quantity is 20 or more', (done) => {
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
      }
    inventoryRepositoryMock.findById.mockReturnValue(of(inventory));
    inventoryRepositoryMock.update.mockReturnValue(of(undefined));

    useCase.execute('642fa2f610712d642de460b3').subscribe((result) => {
      expect(inventory.level).toBe('high');
      expect(result).toBe('Inventory level updated successfully');
      done();
    });
  });
});
