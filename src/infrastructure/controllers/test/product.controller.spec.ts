import { Test, TestingModule } from "@nestjs/testing";
import { Observable, from, of } from "rxjs";
import { ProductController } from "../product.controller";
import { ProductMongoRepository } from "../../../infrastructure/persistence/databases/mongo/repositories/product.repository";
import { ProductService } from "../../../infrastructure/persistence/services/product.service";
import { ProductEntityInfra } from "src/infrastructure/persistence/entities/product.entity";
import { ProductDelegate } from "../../../application/delegates/product.delegate";
import { ProductMongo } from "../../persistence/databases/mongo/schema/product.schema";
import { Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";


describe('ProductController', () => {
    let controller: ProductController;
    let productService: ProductService;
    let productMongoModel: Model<ProductMongo>;
    let productDelegate: ProductDelegate;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [
                {
                    provide: ProductMongoRepository,
                    useValue: {
                        findById: jest.fn(),
                        create: jest.fn(),
                        update: jest.fn(),
                        find: jest.fn(),
                        findByIdAndDelete: jest.fn(),
                        findByIdAndUpdate: jest.fn(),
                    },
                },
                ProductService,

                {
                    provide: ProductDelegate,
                    useValue: {
                        toCreateProduct: jest.fn(),
                        toDeleteProduct: jest.fn(),
                        toUpdateProduct: jest.fn(),
                        toFindProduct: jest.fn(),
                        toFindByIdProduct: jest.fn(),
                        execute: jest.fn(),
                    },
                },

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


            ],
        }).compile();
        productService = module.get<ProductService>(ProductService);
        controller = module.get<ProductController>(ProductController);
        productMongoModel = module.get<Model<ProductMongo>>(getModelToken(ProductMongo.name));
        productDelegate = module.get<ProductDelegate>(ProductDelegate);
        productMongoModel = module.get<Model<ProductMongo>>(getModelToken(ProductMongo.name));
    });

    describe('create', () => {
        it('should return created product', (done) => {

            // Arrange
            //const _id = '641c65deff0153dd0f36bf5';

            const producto = {
                brand: "Marvel",
                description: "Figure action Ryu Street Fighter",
                price: 9080,
                photo: "https://i.pinimg.com/564x/2a/24/f7/2a24f77d8fb55061fbf152154a3f8a2f.jpg"
            };
            const mockData = {
                _id: '641c65deff0153dd0f36bf5',
                brand: "Marvel",
                description: "Figure action Ryu Street Fighter",
                price: 9080,
                photo: "https://i.pinimg.com/564x/2a/24/f7/2a24f77d8fb55061fbf152154a3f8a2f.jpg"
            };
            const expected = {
                _id: '641c65deff0153dd0f36bf5',
                brand: "Marvel",
                description: "Figure action Ryu Street Fighter",
                price: 9080,
                photo: "https://i.pinimg.com/564x/2a/24/f7/2a24f77d8fb55061fbf152154a3f8a2f.jpg"
            };
            const expectedInstanceType = Observable;

            const stubCreate = jest.fn(
                () =>
                    new Observable((subscriber) => {
                        subscriber.next(mockData);
                        subscriber.complete();
                    }),
            );

            jest.spyOn(ProductDelegate.prototype, 'execute').mockReturnValue(stubCreate());

            // Act
            const result = controller.create(producto);

            // Assert
            expect(stubCreate).toHaveBeenCalled();
            expect(result).toBeInstanceOf(expectedInstanceType);
            result.subscribe({
                next: (value) => {
                    expect(value).toEqual(expected);
                    done();
                },
            });
        });
    });

    describe('buscar todos los productos', () => {
        it('debe retornar todos los productos', (done) => {

            // Arrange
            const mockData = [
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
                },

            ];
            const expectedData = [
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
                },
            ];

            const expectedInstanceType = Observable<ProductEntityInfra[]>;

            
            const stubFind = jest.fn(
                () =>
                    new Observable<ProductEntityInfra[]>((subscriber) => {
                        subscriber.next(mockData);
                        subscriber.complete();
                    }),
            );
                    

           // const stubFind = jest.fn(() => from(mockData));

            jest.spyOn(ProductDelegate.prototype, 'execute').mockReturnValue(stubFind());


            // Act
            const result = controller.findAll();

            // Assert
            expect(stubFind).toHaveBeenCalled();
            expect(result).toBeInstanceOf(expectedInstanceType);
            result.subscribe({
                next: (value) => {
                    expect(value).toEqual(expectedData);
                    done();
                },
            });
        });
    });
    
    describe('actualizar', () => {
        it('debe retornar un producto actualizado', (done) => {

            // Arrange
            const _id = '6421bff6a58ee702580f4bef';

            const mockData = {
                brand: "Marvel",
                description: "Figure action Ryu Street Fighter",
                price: 9080,
                photo: "https://i.pinimg.com/564x/2a/24/f7/2a24f77d8fb55061fbf152154a3f8a2f.jpg"
            };
            const expectedData = {
                _id : '6421bff6a58ee702580f4bef',
                brand: "Marvel",
                description: "Figure action Ryu Street Fighter",
                price: 9080,
                photo: "https://i.pinimg.com/564x/2a/24/f7/2a24f77d8fb55061fbf152154a3f8a2f.jpg"
            };
            const expectedInstanceType = Observable<ProductEntityInfra>;

            const stubUpdate = jest.fn(
                () =>
                    new Observable<ProductEntityInfra>((subscriber) => {
                        subscriber.next({ _id, ...mockData } as ProductEntityInfra);
                        subscriber.complete();
                    }),
            );
            jest
                .spyOn(ProductDelegate.prototype, 'execute')
                .mockReturnValue(stubUpdate());

            // Act
            const result = controller.update(_id, mockData);

            // Assert
            expect(stubUpdate).toHaveBeenCalled();
            expect(result).toBeInstanceOf(expectedInstanceType);
            result.subscribe({
                next: (value) => {
                    expect(value).toEqual(expectedData);
                    done();
                },
            });
        });
    });
    
    describe('eliminar', () => {
        it('should return deleteProducto', (done) => {
            // Arrange
            const _id = '6421bff6a58ee702580f4bef';

            const mockData = true;

            const expectedData = true;

            const expectedInstanceType = Observable<boolean>;

            const stubDelete = jest.fn(
                () =>
                    new Observable<boolean>((subscriber) => {
                        subscriber.next(mockData);
                        subscriber.complete();
                    }),
            );
            jest
                .spyOn(ProductDelegate.prototype, 'execute')
                .mockReturnValue(stubDelete());
            // Act
            const result = controller.delete(_id);

            // Assert
            expect(stubDelete).toHaveBeenCalled();
            expect(result).toBeInstanceOf(expectedInstanceType);
            result.subscribe({
                next: (value) => {
                    expect(value).toEqual(expectedData);
                    done();
                },
            });
        });
    });


    //************************************************ */

    describe('find product by id', () => {
        it('Must return a product', (done) => {

            // Arrange
            const _id = '6421bff6a58ee702580f4bef';

            const mockData = {
                _id : '6421bff6a58ee702580f4bef',
                brand: "Marvel",
                description: "Figure action Ryu Street Fighter",
                price: 9080,
                photo: "https://i.pinimg.com/564x/2a/24/f7/2a24f77d8fb55061fbf152154a3f8a2f.jpg"
            };
            const expectedData = {
                _id : '6421bff6a58ee702580f4bef',
                brand: "Marvel",
                description: "Figure action Ryu Street Fighter",
                price: 9080,
                photo: "https://i.pinimg.com/564x/2a/24/f7/2a24f77d8fb55061fbf152154a3f8a2f.jpg"
            };
            const expectedInstanceType = Observable<ProductEntityInfra>;

            const stubFindById = jest.fn(
                () =>
                    new Observable<ProductEntityInfra>((subscriber) => {
                        subscriber.next({ _id, ...mockData } as ProductEntityInfra);
                        subscriber.complete();
                    }),
            );
            jest
                .spyOn(ProductDelegate.prototype, 'execute').mockReturnValue(stubFindById());

            // Act
            const result = controller.findById(_id);

            // Assert
            expect(stubFindById).toHaveBeenCalled();
            expect(result).toBeInstanceOf(expectedInstanceType);
            result.subscribe({
                next: (value) => {
                    expect(value).toEqual(expectedData);
                    done();
                },
            });
        });
    });


    //*********************************************** */
});
