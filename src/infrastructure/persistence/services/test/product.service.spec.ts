import { Model } from "mongoose";
import { ProductMongoRepository } from "../../databases/mongo/repositories/product.repository";
import { ProductMongo } from "../../databases/mongo/schema/product.schema";
import { ProductService } from "../product.service";
import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { lastValueFrom, of, throwError } from "rxjs";
import { InternalServerErrorException } from "@nestjs/common";


describe('ProductService', () => {
    let productMongoRepository: ProductMongoRepository;
    let productMongoModel: Model<ProductMongo>;
    let productService: ProductService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [ProductMongoRepository,
          {
            provide: getModelToken(ProductMongo.name),
            useValue: {
              findById: jest.fn(),
              create: jest.fn(),
              findByIdAndDelete: jest.fn(),
              find: jest.fn(),
              findByIdAndUpdate: jest.fn(),
            },
          },
          ProductService,
        ],
      }).compile();
      productService = module.get<ProductService>(ProductService);
      productMongoRepository = module.get<ProductMongoRepository>(ProductMongoRepository);
      productMongoModel = module.get<Model<ProductMongo>>(getModelToken(ProductMongo.name));
    });
  
    it('should be defined', () => {
      expect(ProductMongoRepository).toBeDefined();
    });
  
  
  
    describe('findAll', () => {
        it('should return an array of ProductMongos', async () => {

          const mockProductMongos = [
            {
              brand: "Marvel",
              description: "Figure action Ryu Street Fighter",
              price: 9080,
              photo: "https://i.pinimg.com/564x/2a/24/f7/2a24f77d8fb55061fbf152154a3f8a2f.jpg"
            },
            {
              brand: "Storm",
              description: "Figure action Sagat Street Fighter",
              price: 8080,
              photo: "https://i.pinimg.com/564x/d5/f7/02/d5f702915ba844a536fa56e83aaa02b2.jpg"
            }
          ];

    
          jest.spyOn(productMongoModel, 'find').mockResolvedValue(mockProductMongos as any);
    
          const result =  productMongoRepository.findAll();
    
          expect(await lastValueFrom(result)).toEqual(mockProductMongos);
        });
      });
  
  
    describe('create', () => {
      it('Debe devolver un nuevo ProductMongo', async () => {
  
        // Arrange
        const ProductMongo = 
        {
          brand: "Marvel",
          description: "Figure action Ryu Street Fighter",
          price: 9080,
          photo: "https://i.pinimg.com/564x/2a/24/f7/2a24f77d8fb55061fbf152154a3f8a2f.jpg"
        };
  
        const mockProductMongo = {
          _id: "642eff6e20b57580dfc38a7f",
          brand: "Marvel",
          description: "Figure action Ryu Street Fighter",
          price: 9080,
          photo: "https://i.pinimg.com/564x/2a/24/f7/2a24f77d8fb55061fbf152154a3f8a2f.jpg"
      };
  
        const expectedProductMongo = {
          _id: "642eff6e20b57580dfc38a7f",
          brand: "Marvel",
          description: "Figure action Ryu Street Fighter",
          price: 9080,
          photo: "https://i.pinimg.com/564x/2a/24/f7/2a24f77d8fb55061fbf152154a3f8a2f.jpg"
      };
  
  
        jest.spyOn(productMongoModel, 'create').mockResolvedValue(mockProductMongo as any);
  
        // Act
        const result = productMongoRepository.create(ProductMongo);
  
        // Assert
        expect(await lastValueFrom(result)).toEqual(expectedProductMongo);
      });
    });
  
  
  
    describe('update', () => {
      it('Debe devolver un ProductMongo actualizado', async () => {
  
        // Arrange
        const _id = '642eff6e20b57580dfc38a7f';
  
        const ProductMongo = {
          brand: "DC",
          description: "Figure action Batman",
          price: 4000,
          photo: "https://i.pinimg.com/564x/2a/24/f7/2a24f77d8fb55061fbf152154a3f8a2f.jpg"
        };
  
        const mockProductMongo = {
          _id: "642eff6e20b57580dfc38a7f",
          brand: "DC",
          description: "Figure action Batman",
          price: 4000,
          photo: "https://i.pinimg.com/564x/2a/24/f7/2a24f77d8fb55061fbf152154a3f8a2f.jpg"
        };
  
        const expectedProductMongo = {
          _id: "642eff6e20b57580dfc38a7f",
          brand: "DC",
          description: "Figure action Batman",
          price: 4000,
          photo: "https://i.pinimg.com/564x/2a/24/f7/2a24f77d8fb55061fbf152154a3f8a2f.jpg"
        };
  
        jest
          .spyOn(productMongoModel, 'findByIdAndUpdate').mockResolvedValue(mockProductMongo as any);
  
        // Act
        const result = productMongoRepository.update(_id, ProductMongo);
  
        // Assert
        expect(await lastValueFrom(result)).toEqual(expectedProductMongo);
      });
  
      it('Debe lanzar un InternalServerErrorException', (done) => {
        // Arrange
        const _id = '642eff6e20b57580dfc38a7f';
  
        const ProductMongo = {
          brand: "DC",
          description: "Figure action Batman",
          price: 4000,
          photo: "https://i.pinimg.com/564x/2a/24/f7/2a24f77d8fb55061fbf152154a3f8a2f.jpg"
        };
  
        const errorMessage = 'Something went wrong';
  
        const mockError = jest.fn().mockReturnValueOnce(throwError(new InternalServerErrorException(errorMessage)));
  
        productMongoRepository.update = mockError;
  
        // Act
        const result = productMongoRepository.update(_id, ProductMongo);
  
        // Assert
        result.subscribe({
          error: (err) => {
            expect(err).toBeInstanceOf(InternalServerErrorException);
            expect(err.message).toBe(errorMessage);
            expect(mockError).toHaveBeenCalled();
            done();
          },
        });
      });
  
    });
  
  
    describe('delete', () => {
      it('Debe devolver True', async () => {
  
        // Arrange
        const _id = '642eff6e20b57580dfc38a7f';
  
        const expectedResponse = true;
  
  
        jest
          .spyOn(productMongoModel, 'findByIdAndDelete')
          .mockResolvedValue({} as any);
  
        // Act
        const result = productMongoRepository.delete(_id);
  
        // Assert
        expect(await lastValueFrom(result)).toEqual(expectedResponse);
      });
  
      it('Debe lanzar un InternalServerErrorException', (done) => {
        // Arrange
        const _id = '642eff6e20b57580dfc38a7f';
  
        const errorMessage = 'Something went wrong';
  
        const mockError = jest.fn().mockReturnValueOnce(throwError(new InternalServerErrorException(errorMessage)));
  
        productMongoRepository.delete = mockError;
  
        // Act
        const result = productMongoRepository.delete(_id);
  
        // Assert
        result.subscribe({
          error: (err) => {
            expect(err).toBeInstanceOf(InternalServerErrorException);
            expect(err.message).toBe(errorMessage);
            expect(mockError).toHaveBeenCalled();
            done();
          },
        });
      });
  
    });
  
  
    describe('findById', () => {
      it('Debe devolver un ProductMongo actualizado', async () => {
  
        // Arrange
        const _id = '642eff6e20b57580dfc38a7f';
  
        const mockProductMongo = {
          _id: "642eff6e20b57580dfc38a7f",
          brand: "DC",
          description: "Figure action Batman",
          price: 4000,
          photo: "https://i.pinimg.com/564x/2a/24/f7/2a24f77d8fb55061fbf152154a3f8a2f.jpg"
        };
  
        const expectedProductMongo = {
          _id: "642eff6e20b57580dfc38a7f",
          brand: "DC",
          description: "Figure action Batman",
          price: 4000,
          photo: "https://i.pinimg.com/564x/2a/24/f7/2a24f77d8fb55061fbf152154a3f8a2f.jpg"
        };
  
        jest
          .spyOn(productMongoModel, 'findById').mockResolvedValue(mockProductMongo as any);
  
        // Act
        const result = productMongoRepository.findById(_id);
  
        // Assert
        expect(await lastValueFrom(result)).toEqual(expectedProductMongo);
      });
  
    });
  
  
  })

  