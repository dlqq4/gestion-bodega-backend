import { IProductRepository } from "src/domain/i-repository/i-product.repositoty";
import { IUseCase } from "../interface/use-case.interface";
import { ProductDomain } from "src/domain/models/product.model";
import { Observable } from "rxjs";

export class FindProductUseCase implements IUseCase {

    constructor(private readonly productRepository: IProductRepository) {

    }
  
    execute(): Observable<ProductDomain[]> {
      return this.productRepository.findAll();
    }

  }