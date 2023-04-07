import { IProductRepository } from "src/domain/i-repository/i-product.repositoty";
import { IUseCase } from "../interface/use-case.interface";
import { ProductDomain } from "src/domain/models/product.model";
import { Observable } from "rxjs";

export class DeleteProductUseCase implements IUseCase {

    constructor(private readonly productRepository: IProductRepository) {

    }
  
    execute(id: string): Observable<boolean> {
      return this.productRepository.delete(id);
    }

  }