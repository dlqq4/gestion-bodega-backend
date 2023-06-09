import { IInventoryRepository } from "../../../domain/i-repository/i-inventory.repositoty";
import { IUseCase } from "../interface/use-case.interface";
import { InventoryDomain } from "../../../domain/models/inventory.model";
import { Observable } from "rxjs";

export class CreateInventoryUseCase implements IUseCase {

    constructor(private readonly InventoryRepository: IInventoryRepository) {

    }
  
    execute(Inventory: InventoryDomain): Observable<InventoryDomain> {
      return this.InventoryRepository.create(Inventory);
    }

  }