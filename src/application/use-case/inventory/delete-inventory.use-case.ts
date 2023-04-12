import { IInventoryRepository } from "../../../domain/i-repository/i-inventory.repositoty";
import { IUseCase } from "../interface/use-case.interface";
import { Observable } from "rxjs";

export class DeleteInventoryUseCase implements IUseCase {

    constructor(private readonly InventoryRepository: IInventoryRepository) {

    }
  
    execute(id: string): Observable<boolean> {
      return this.InventoryRepository.delete(id);
    }

  }