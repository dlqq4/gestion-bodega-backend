import { IProductRepository } from "src/domain/i-repository/i-product.repositoty";
import { IUseCase } from "../interface/use-case.interface";
import { ProductDomain } from "src/domain/models/product.model";
import { Observable } from "rxjs";

export class CreateProductUseCase implements IUseCase {

    constructor(private readonly productRepository: IProductRepository) {

    }
  
    execute(product: ProductDomain): Observable<ProductDomain> {
      return this.productRepository.create(product);
    }

  }