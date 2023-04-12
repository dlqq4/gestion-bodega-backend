import { IInventoryRepository } from "../../../domain/i-repository/i-inventory.repositoty";
import { IUseCase } from "../interface/use-case.interface";
import { InventoryDomain } from "../../../domain/models/inventory.model";
import { Observable } from "rxjs";

export class FindInventoryUseCase implements IUseCase {

    constructor(private readonly InventoryRepository: IInventoryRepository) {

    }
  
    execute(): Observable<InventoryDomain[]> {
      return this.InventoryRepository.findAll();
    }

  }