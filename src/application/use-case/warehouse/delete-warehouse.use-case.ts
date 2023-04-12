import { IWareHouseRepository } from "../../../domain/i-repository/i-WareHouse.repositoty";
import { IUseCase } from "../interface/use-case.interface";
import { WareHouseDomain } from "src/domain/models/WareHouse.model";
import { Observable } from "rxjs";

export class DeleteWareHouseUseCase implements IUseCase {

    constructor(private readonly WareHouseRepository: IWareHouseRepository) {

    }
  
    execute(id: string): Observable<boolean> {
      return this.WareHouseRepository.delete(id);
    }

  }