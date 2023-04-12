import { IWareHouseRepository } from "../../../domain/i-repository/i-WareHouse.repositoty";
import { IUseCase } from "../interface/use-case.interface";
import { WareHouseDomain } from "src/domain/models/WareHouse.model";
import { Observable } from "rxjs";

export class FindWareHouseUseCase implements IUseCase {

    constructor(private readonly WareHouseRepository: IWareHouseRepository) {

    }
  
    execute(): Observable<WareHouseDomain[]> {
      return this.WareHouseRepository.findAll();
    }

  }