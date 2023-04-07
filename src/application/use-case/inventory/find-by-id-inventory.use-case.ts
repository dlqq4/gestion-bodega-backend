import { IInventoryRepository } from "src/domain/i-repository/i-Inventory.repositoty";
import { IUseCase } from "../interface/use-case.interface";
import { InventoryDomain } from "src/domain/models/Inventory.model";
import { Observable } from "rxjs";

export class FindByIdInventoryUseCase implements IUseCase {

    constructor(private readonly InventoryRepository: IInventoryRepository) {

    }
  
    execute(id: string): Observable<InventoryDomain> {
      return this.InventoryRepository.findById(id);
    }

  }