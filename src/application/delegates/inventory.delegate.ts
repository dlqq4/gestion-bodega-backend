import { Observable } from 'rxjs';
import { IUseCase } from '../use-case/interface/use-case.interface';
import { IInventoryRepository } from 'src/domain/i-repository/i-Inventory.repositoty';
import { CreateInventoryUseCase} from '../use-case/create-Inventory.use-case';
import { DeleteInventoryUseCase } from '../use-case/delete-Inventory.use-case';
import { FindInventoryUseCase } from '../use-case/find-Inventory.use-case';
import { UpdateInventoryUseCase } from '../use-case/update-Inventory.use-case';
import { FindByIdInventoryUseCase } from '../use-case/find-by-id-inventory.use-case';
import { SetInventoryLevelByIdUseCase } from '../use-case/set-inventory-level.use-case';
import { UpdateInventoryQuantityUseCase } from '../use-case/update-inventory-quantity.use-case';

export class InventoryDelegate implements IUseCase {

  private delegate: IUseCase;

  constructor(private readonly InventoryRepository: IInventoryRepository) {
    
  }

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toCreateInventory(): void {
    this.delegate = new CreateInventoryUseCase(this.InventoryRepository);
  }

  toDeleteInventory(): void {
    this.delegate = new DeleteInventoryUseCase(this.InventoryRepository);
  }

  toFindInventory(): void {
    this.delegate = new FindInventoryUseCase(this.InventoryRepository);
  }

  toUpdateInventory(): void {
    this.delegate = new UpdateInventoryUseCase(this.InventoryRepository);
  }
  
  toFindByIdInventory(): void {
    this.delegate = new FindByIdInventoryUseCase(this.InventoryRepository);
  }

  toSetLevelInventory(): void {
    this.delegate = new SetInventoryLevelByIdUseCase(this.InventoryRepository);
  }

  toUpdateQuantityInventory(): void {
    this.delegate = new UpdateInventoryQuantityUseCase(this.InventoryRepository);
  }

}