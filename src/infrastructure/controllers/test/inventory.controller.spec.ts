import { Test, TestingModule } from "@nestjs/testing";
import { Observable, from, of } from "rxjs";
import { InventoryController } from "../Inventory.controller";
import { InventoryMongoRepository } from "../../persistence/databases/mongo/repositories/Inventory.repository";
import { InventoryService } from "../../persistence/services/Inventory.service";
import { InventoryEntityInfra } from "src/infrastructure/persistence/entities/Inventory.entity";
import { InventoryDelegate } from "../../../application/delegates/Inventory.delegate";
import { InventoryMongo } from "../../persistence/databases/mongo/schema/Inventory.schema";
import { Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";


describe('HareHouseController', () => {
    let controller: InventoryController;
    let inventoryService: InventoryService;
    let inventoryMongoModel: Model<InventoryMongo>;
    let inventoryDelegate: InventoryDelegate;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [InventoryController],
            providers: [
                {
                    provide: InventoryMongoRepository,
                    useValue: {
                        findById: jest.fn(),
                        create: jest.fn(),
                        update: jest.fn(),
                        find: jest.fn(),
                        findByIdAndDelete: jest.fn(),
                        findByIdAndUpdate: jest.fn(),
                    },
                },
                InventoryService,

                {
                    provide: InventoryDelegate,
                    useValue: {
                        toCreateInventory: jest.fn(),
                        toDeleteInventory: jest.fn(),
                        toUpdateInventory: jest.fn(),
                        toFindInventory: jest.fn(),
                        toFindByIdInventory: jest.fn(),
                        execute: jest.fn(),
                    },
                },

                {
                    provide: getModelToken(InventoryMongo.name),
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
        inventoryService = module.get<InventoryService>(InventoryService);
        controller = module.get<InventoryController>(InventoryController);
        inventoryMongoModel = module.get<Model<InventoryMongo>>(getModelToken(InventoryMongo.name));
        inventoryDelegate = module.get<InventoryDelegate>(InventoryDelegate);
        inventoryMongoModel = module.get<Model<InventoryMongo>>(getModelToken(InventoryMongo.name));
    });

    describe('create', () => {
        it('should return created Inventory', (done) => {

            // Arrange

            const Inventory = {
                product: "642f658515ea2d5196948be6",
                warehouse: "642f4085235dc7d9d0120519",
                level: "",
                quantity: 1
            };

            const mockData = {
                product: {
                  brand: "Marvel",
                  description: "Figure action Ryu Street Fighter",
                  price: 9080,
                  photo: "https://i.pinimg.com/564x/2a/24/f7/2a24f77d8fb55061fbf152154a3f8a2f.jpg"
                },
                warehouse: {
                  name: "Los Santos",
                  address: "California, USA",
                  phone: "0947890223263"
                },
                level: "HIGH",
                quantity: 200
              };
            const expected = {
                product: {
                  brand: "Marvel",
                  description: "Figure action Ryu Street Fighter",
                  price: 9080,
                  photo: "https://i.pinimg.com/564x/2a/24/f7/2a24f77d8fb55061fbf152154a3f8a2f.jpg"
                },
                warehouse: {
                  name: "Los Santos",
                  address: "California, USA",
                  phone: "0947890223263"
                },
                level: "HIGH",
                quantity: 200
              };
            const expectedInstanceType = Observable;

            const stubCreate = jest.fn(
                () =>
                    new Observable((subscriber) => {
                        subscriber.next(mockData);
                        subscriber.complete();
                    }),
            );

            jest.spyOn(InventoryDelegate.prototype, 'execute').mockReturnValue(stubCreate());

            // Act
            const result = controller.create(Inventory);

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

    describe('findAll', () => {
        it('debe retornar todos los Inventoryos', (done) => {

            // Arrange
            const mockData = [
                {
                    product: {
                      brand: "Marvel",
                      description: "Figure action Ryu Street Fighter",
                      price: 9080,
                      photo: "https://i.pinimg.com/564x/2a/24/f7/2a24f77d8fb55061fbf152154a3f8a2f.jpg"
                    },
                    warehouse: {
                      name: "Los Santos",
                      address: "California, USA",
                      phone: "0947890223263"
                    },
                    level: "HIGH",
                    quantity: 200
                  },
                

            ];
            const expectedData = [
                {
                    product: {
                      brand: "Marvel",
                      description: "Figure action Ryu Street Fighter",
                      price: 9080,
                      photo: "https://i.pinimg.com/564x/2a/24/f7/2a24f77d8fb55061fbf152154a3f8a2f.jpg"
                    },
                    warehouse: {
                      name: "Los Santos",
                      address: "California, USA",
                      phone: "0947890223263"
                    },
                    level: "HIGH",
                    quantity: 200
                  },
                
            ];

            const expectedInstanceType = Observable<InventoryEntityInfra[]>;


            const stubFind = jest.fn(
                () =>
                    new Observable<InventoryEntityInfra[]>((subscriber) => {
                        subscriber.next(mockData);
                        subscriber.complete();
                    }),
            );


            jest.spyOn(InventoryDelegate.prototype, 'execute').mockReturnValue(stubFind());


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

    describe('update', () => {
        it('debe retornar un Inventoryo actualizado', (done) => {

            // Arrange
            const _id = '642fa2f610712d642de460b3';

            const mockData = {
                product: "642f658515ea2d5196948be6",
                warehouse: "642f4085235dc7d9d0120519",
                level: "LOW",
                quantity: 1,
                _id: "642fa2f610712d642de460b3"
              };

            const expectedData = {
                product: "642f658515ea2d5196948be6",
                warehouse: "642f4085235dc7d9d0120519",
                level: "LOW",
                quantity: 1,
                _id: "642fa2f610712d642de460b3"
              };

            const expectedInstanceType = Observable<InventoryEntityInfra>;

            const stubUpdate = jest.fn(
                () =>
                    new Observable<InventoryEntityInfra>((subscriber) => {
                        subscriber.next({ _id, ...mockData } as unknown as InventoryEntityInfra);
                        subscriber.complete();
                    }),
            );
            jest
                .spyOn(InventoryDelegate.prototype, 'execute')
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

    describe('delete', () => {
        it('should return deleteInventoryo', (done) => {
            // Arrange
            const _id = '642fae07d90efd0793fa7609';

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
                .spyOn(InventoryDelegate.prototype, 'execute')
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

    describe('findById', () => {
        it('Must return a Inventory', (done) => {

            // Arrange
            const _id = '642fae07d90efd0793fa7609';

            const mockData = {
                _id: "642fa2f610712d642de460b3",
                product: "642f658515ea2d5196948be6",
                warehouse: "642f4085235dc7d9d0120519",
                level: "low",
                quantity: 1
              };

            const expectedData = {
                _id: "642fa2f610712d642de460b3",
                product: "642f658515ea2d5196948be6",
                warehouse: "642f4085235dc7d9d0120519",
                level: "low",
                quantity: 1
              };

            const expectedInstanceType = Observable<InventoryEntityInfra>;

            const stubFindById = jest.fn(
                () =>
                    new Observable<InventoryEntityInfra>((subscriber) => {
                        subscriber.next({ _id, ...mockData } as unknown as InventoryEntityInfra);
                        subscriber.complete();
                    }),
            );
            jest
                .spyOn(InventoryDelegate.prototype, 'execute').mockReturnValue(stubFindById());

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


});
