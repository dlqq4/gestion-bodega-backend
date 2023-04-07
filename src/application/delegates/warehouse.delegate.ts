import { Observable } from 'rxjs';
import { IUseCase } from '../use-case/interface/use-case.interface';
import { IWareHouseRepository } from 'src/domain/i-repository/i-WareHouse.repositoty';
import { CreateWareHouseUseCase} from '../use-case/create-WareHouse.use-case';
import { DeleteWareHouseUseCase } from '../use-case/delete-WareHouse.use-case';
import { FindWareHouseUseCase } from '../use-case/find-WareHouse.use-case';
import { UpdateWareHouseUseCase } from '../use-case/update-WareHouse.use-case';
import { FindByIdWareHouseUseCase } from '../use-case/find-by-id-warehouse.use-case';

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