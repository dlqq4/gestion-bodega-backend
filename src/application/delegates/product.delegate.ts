import { Observable } from 'rxjs';
import { IUseCase } from '../use-case/interface/use-case.interface';
import { IProductRepository } from 'src/domain/i-repository/i-product.repositoty';
import { CreateProductUseCase} from '../use-case/product/create-product.use-case';
import { DeleteProductUseCase } from '../use-case/product/delete-product.use-case';
import { FindProductUseCase } from '../use-case/product/find-product.use-case';
import { UpdateProductUseCase } from '../use-case/product/update-product.use-case';
import { FindByIdProductUseCase } from '../use-case/product/find-by-id-product.use-case';

export class ProductDelegate implements IUseCase {

  private delegate: IUseCase;

  constructor(private readonly ProductRepository: IProductRepository) {
    
  }

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toCreateProduct(): void {
    this.delegate = new CreateProductUseCase(this.ProductRepository);
  }

  toDeleteProduct(): void {
    this.delegate = new DeleteProductUseCase(this.ProductRepository);
  }

  toFindProduct(): void {
    this.delegate = new FindProductUseCase(this.ProductRepository);
  }

  toUpdateProduct(): void {
    this.delegate = new UpdateProductUseCase(this.ProductRepository);
  }
  
  toFindByIdProduct(): void {
    this.delegate = new FindByIdProductUseCase(this.ProductRepository);
  }

}