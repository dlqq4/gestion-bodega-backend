import { IWareHouseRepository } from "../../../domain/i-repository/i-warehouse.repositoty";
import { IUseCase } from "../interface/use-case.interface";
import { Observable } from "rxjs";

export class DeleteWareHouseUseCase implements IUseCase {

    constructor(private readonly WareHouseRepository: IWareHouseRepository) {

    }
  
    execute(id: string): Observable<boolean> {
      return this.WareHouseRepository.delete(id);
    }

  }