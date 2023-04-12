import { Observable, switchMap } from "rxjs";
import { IInventoryRepository } from "../../../domain/i-repository/i-Inventory.repositoty";
import { InventoryDomain } from "src/domain/models/inventory.model";
import { IUseCase } from "../interface/use-case.interface";


export class UpdateInventoryQuantityUseCase implements IUseCase {

  constructor(private readonly InventoryRepository: IInventoryRepository) {

  }


  execute(id: string, Inventory: InventoryDomain): Observable<InventoryDomain> {
      return this.InventoryRepository.findById(id).pipe(
          switchMap((foundInventory: InventoryDomain) => {
              foundInventory.quantity = Inventory.quantity;
              foundInventory.level = foundInventory.quantity < 10 ? 'LOW' : foundInventory.quantity < 50 ? 'MEDIUM' : 'HIGH';
              return this.InventoryRepository.update(id, foundInventory);
          })
      );
  }
}