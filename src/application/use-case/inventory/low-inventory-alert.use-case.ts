import { IInventoryRepository } from "../../../domain/i-repository/i-inventory.repositoty";
import { IUseCase } from "../interface/use-case.interface";
import { Observable, map } from "rxjs";
import { InventoryDomain } from "../../../domain/models/inventory.model";

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