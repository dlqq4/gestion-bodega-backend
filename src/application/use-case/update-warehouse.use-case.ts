import { IWareHouseRepository } from "src/domain/i-repository/i-WareHouse.repositoty";
import { IUseCase } from "./interface/use-case.interface";
import { WareHouseDomain } from "src/domain/models/WareHouse.model";
import { Observable } from "rxjs";

export class UpdateWareHouseUseCase implements IUseCase {

    constructor(private readonly WareHouseRepository: IWareHouseRepository) {

    }
  
    execute(id: string, WareHouse: WareHouseDomain): Observable<WareHouseDomain> {
      return this.WareHouseRepository.update(id, WareHouse);
    }

  }