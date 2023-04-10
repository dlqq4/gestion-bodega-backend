import { of } from 'rxjs';
import { LowInventoryAlertUseCase } from '../use-case/inventory/low-inventory-alert.use-case';
import { InventoryDomain } from 'src/domain/models/inventory.model';


describe('LowInventoryAlertUseCase', () => {
  let inventoryRepositoryMock;
  let useCase: LowInventoryAlertUseCase;

  beforeEach(() => {
    inventoryRepositoryMock = {
      findById: jest.fn(),
    };
    useCase = new LowInventoryAlertUseCase(inventoryRepositoryMock);
  });

  it('should return a low inventory alert when inventory quantity is less than 3', (done) => {

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

    useCase.execute('642fa2f610712d642de460b3').subscribe((result) => {
      expect(result).toBe('Low inventory alert!');
      done();
    });
  });

  it('should return a sufficient inventory message when inventory quantity is 3 or more', (done) => {

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

    inventoryRepositoryMock.findById.mockReturnValue(of(inventory));

    useCase.execute('642fa2f610712d642de460b3').subscribe((result) => {
      expect(result).toBe('Inventory quantity is sufficient');
      done();
    });
  });
});
