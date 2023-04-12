import { Observable } from 'rxjs';
import { IUseCase } from '../use-case/interface/use-case.interface';
import { IWareHouseRepository } from '../../domain/i-repository/i-warehouse.repositoty';
import { CreateWareHouseUseCase} from '../use-case/warehouse/create-warehouse.use-case';
import { DeleteWareHouseUseCase } from '../use-case/warehouse/delete-warehouse.use-case';
import { FindWareHouseUseCase } from '../use-case/warehouse/find-warehouse.use-case';
import { UpdateWareHouseUseCase } from '../use-case/warehouse/update-warehouse.use-case';
import { FindByIdWareHouseUseCase } from '../use-case/warehouse/find-by-id-warehouse.use-case';

export class WareHouseDelegate implements IUseCase {

  private delegate: IUseCase;

  constructor(private readonly WareHouseRepository: IWareHouseRepository) {
    
  }

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toCreateWareHouse(): void {
    this.delegate = new CreateWareHouseUseCase(this.WareHouseRepository);
  }

  toDeleteWareHouse(): void {
    this.delegate = new DeleteWareHouseUseCase(this.WareHouseRepository);
  }

  toFindWareHouse(): void {
    this.delegate = new FindWareHouseUseCase(this.WareHouseRepository);
  }

  toUpdateWareHouse(): void {
    this.delegate = new UpdateWareHouseUseCase(this.WareHouseRepository);
  }
  
  toFindByIdWareHouse(): void {
    this.delegate = new FindByIdWareHouseUseCase(this.WareHouseRepository);
  }

}