import { IInventoryRepository } from "src/domain/i-repository/i-Inventory.repositoty";
import { IUseCase } from "../interface/use-case.interface";
import { Observable, map } from "rxjs";
import { InventoryDomain } from "src/domain/models/inventory.model";

export class LowInventoryAlertUseCase implements IUseCase {
    constructor(private readonly inventoryRepository: IInventoryRepository) {}
  
    execute(id: string): Observable<string> {
      return this.inventoryRepository.findById(id).pipe(
        map((inventory: InventoryDomain) => {
          if (inventory.quantity < 3) {
            return 'Low inventory alert!';
          }
          return 'Inventory quantity is sufficient';
        })
      );
    }
  }