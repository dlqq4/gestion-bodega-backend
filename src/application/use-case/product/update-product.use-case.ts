import { IProductRepository } from "src/domain/i-repository/i-product.repositoty";
import { IUseCase } from "../interface/use-case.interface";
import { ProductDomain } from "src/domain/models/product.model";
import { Observable } from "rxjs";

export class UpdateProductUseCase implements IUseCase {

    constructor(private readonly productRepository: IProductRepository) {

    }
  
    execute(id: string, product: ProductDomain): Observable<ProductDomain> {
      return this.productRepository.update(id, product);
    }

  }