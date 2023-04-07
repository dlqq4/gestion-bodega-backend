import { IInventoryRepository } from "src/domain/i-repository/i-Inventory.repositoty";
import { IUseCase } from "./interface/use-case.interface";
import { InventoryDomain } from "src/domain/models/inventory.model";
import { Observable, map, switchMap } from "rxjs";

export class SetInventoryLevelByIdUseCase implements IUseCase {

    constructor(private readonly inventoryRepository: IInventoryRepository<InventoryDomain>) {

    }
  
    execute(id: string): Observable<string> {
      return this.inventoryRepository.findById(id).pipe(
        switchMap((inventory: InventoryDomain) => {
          if (!inventory) {
            throw new Error("Inventory not found");
          }
          if (inventory.quantity < 10) {
            inventory.level = "low";
          } else if (inventory.quantity < 20) {
            inventory.level = "medium";
          } else {
            inventory.level = "high";
          }
          return this.inventoryRepository.update(id, inventory);
        }),
        map(() => {
          return "Inventory level updated successfully";
        })
      );
    }
  }

  /*
  SetInventoryLevelByIdUseCase utiliza el método findById del repositorio
   para buscar un registro específico de InventoryDomain por su ID.
    Luego, comprueba si el registro existe y actualiza la propiedad level
     según la cantidad de existencias que tenga.
      Finalmente, llama al método update del repositorio para guardar los cambios.
  */