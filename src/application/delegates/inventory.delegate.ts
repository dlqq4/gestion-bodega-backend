import { Observable } from 'rxjs';
import { IUseCase } from '../use-case/interface/use-case.interface';
import { IInventoryRepository } from '../../domain/i-repository/i-Inventory.repositoty';
import { CreateInventoryUseCase} from '../use-case/inventory/create-inventory.use-case';
import { DeleteInventoryUseCase } from '../use-case/inventory/delete-inventory.use-case';
import { FindInventoryUseCase } from '../use-case/inventory/find-inventory.use-case';
import { UpdateInventoryUseCase } from '../use-case/inventory/update-inventory.use-case';
import { FindByIdInventoryUseCase } from '../use-case/inventory/find-by-id-inventory.use-case';
import { SetInventoryLevelByIdUseCase } from '../use-case/inventory/set-inventory-level.use-case';
import { UpdateInventoryQuantityUseCase } from '../use-case/inventory/update-inventory-quantity.use-case';
import { LowInventoryAlertUseCase } from '../use-case/inventory/low-inventory-alert.use-case';


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

  //*******************************NO CRUD*************************************/

  toSetLevelInventory(): void {
    this.delegate = new SetInventoryLevelByIdUseCase(this.InventoryRepository);
  }

  toUpdateQuantityInventory(): void {
    this.delegate = new UpdateInventoryQuantityUseCase(this.InventoryRepository);
  }

  toLowInventoryAlert(): void {
    this.delegate = new LowInventoryAlertUseCase(this.InventoryRepository);
  }


}