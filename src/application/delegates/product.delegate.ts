import { Observable } from 'rxjs';
import { IUseCase } from '../use-case/interface/use-case.interface';
import { IProductRepository } from 'src/domain/i-repository/i-product.repositoty';
import { CreateUseCase } from '../use-case/create.use-case';

export class ProductDelegate implements IUseCase {

  private delegate: IUseCase;

  constructor(private readonly ProductRepository: IProductRepository) {
    
  }

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toCreateProduct(): void {
    this.delegate = new CreateUseCase(this.ProductRepository);
  }

  //RESTO DE CASOS DE USO RELACIONADOS A PRODUCT
  
}