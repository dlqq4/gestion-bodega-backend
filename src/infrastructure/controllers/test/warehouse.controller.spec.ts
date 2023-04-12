import { Test, TestingModule } from "@nestjs/testing";
import { Observable, from, of } from "rxjs";
import { WareHouseController } from "../WareHouse.controller";
import { WareHouseMongoRepository } from "../../persistence/databases/mongo/repositories/WareHouse.repository";
import { WareHouseService } from "../../../infrastructure/persistence/services/warehouse.service";
import { WareHouseEntityInfra } from "src/infrastructure/persistence/entities/WareHouse.entity";
import { WareHouseDelegate } from "../../../application/delegates/WareHouse.delegate";
import { WareHouseMongo } from "../../persistence/databases/mongo/schema/WareHouse.schema";
import { Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";


describe('HareHouseController', () => {
    let controller: WareHouseController;
    let wareHouseService: WareHouseService;
    let wareHouseMongoModel: Model<WareHouseMongo>;
    let wareHouseDelegate: WareHouseDelegate;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [WareHouseController],
            providers: [
                {
                    provide: WareHouseMongoRepository,
                    useValue: {
                        findById: jest.fn(),
                        create: jest.fn(),
                        update: jest.fn(),
                        find: jest.fn(),
                        findByIdAndDelete: jest.fn(),
                        findByIdAndUpdate: jest.fn(),
                    },
                },
                WareHouseService,

                {
                    provide: WareHouseDelegate,
                    useValue: {
                        toCreateWareHouse: jest.fn(),
                        toDeleteWareHouse: jest.fn(),
                        toUpdateWareHouse: jest.fn(),
                        toFindWareHouse: jest.fn(),
                        toFindByIdWareHouse: jest.fn(),
                        execute: jest.fn(),
                    },
                },

                {
                    provide: getModelToken(WareHouseMongo.name),
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
        wareHouseService = module.get<WareHouseService>(WareHouseService);
        controller = module.get<WareHouseController>(WareHouseController);
        wareHouseMongoModel = module.get<Model<WareHouseMongo>>(getModelToken(WareHouseMongo.name));
        wareHouseDelegate = module.get<WareHouseDelegate>(WareHouseDelegate);
        wareHouseMongoModel = module.get<Model<WareHouseMongo>>(getModelToken(WareHouseMongo.name));
    });

    describe('create', () => {
        it('should return created WareHouse', (done) => {

            // Arrange

            const WareHouse = {
                name: "Vice City",
                address: "Miami, USA",
                phone: "3050009660028"
            };
            const mockData = {
                name: "Vice City",
                address: "Miami, USA",
                phone: "3050009660028",
                _id: "642fae07d90efd0793fa7609"
            };
            const expected = {
                name: "Vice City",
                address: "Miami, USA",
                phone: "3050009660028",
                _id: "642fae07d90efd0793fa7609"
            };
            const expectedInstanceType = Observable;

            const stubCreate = jest.fn(
                () =>
                    new Observable((subscriber) => {
                        subscriber.next(mockData);
                        subscriber.complete();
                    }),
            );

            jest.spyOn(WareHouseDelegate.prototype, 'execute').mockReturnValue(stubCreate());

            // Act
            const result = controller.create(WareHouse);

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
        it('debe retornar todos los WareHouseos', (done) => {

            // Arrange
            const mockData = [
                {
                    name: "Vice City",
                    address: "Miami, USA",
                    phone: "3050009660028"
                },
                {
                    name: "Los Santos",
                    address: "California, USA",
                    phone: "305598764565465"
                },

            ];
            const expectedData = [
                {
                    name: "Vice City",
                    address: "Miami, USA",
                    phone: "3050009660028",                    
                },
                {
                    name: "Los Santos",
                    address: "California, USA",
                    phone: "305598764565465",
                },
            ];

            const expectedInstanceType = Observable<WareHouseEntityInfra[]>;


            const stubFind = jest.fn(
                () =>
                    new Observable<WareHouseEntityInfra[]>((subscriber) => {
                        subscriber.next(mockData);
                        subscriber.complete();
                    }),
            );


            // const stubFind = jest.fn(() => from(mockData));

            jest.spyOn(WareHouseDelegate.prototype, 'execute').mockReturnValue(stubFind());


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
        it('debe retornar un WareHouseo actualizado', (done) => {

            // Arrange
            const _id = '642fae07d90efd0793fa7609';

            const mockData = {
                name: "Vice City",
                address: "Miami, USA",
                phone: "3050009660028"
            };
            const expectedData = {
                name: "Vice City",
                address: "Miami, USA",
                phone: "3050009660028",
                _id: "642fae07d90efd0793fa7609"
            };
            const expectedInstanceType = Observable<WareHouseEntityInfra>;

            const stubUpdate = jest.fn(
                () =>
                    new Observable<WareHouseEntityInfra>((subscriber) => {
                        subscriber.next({ _id, ...mockData } as WareHouseEntityInfra);
                        subscriber.complete();
                    }),
            );
            jest
                .spyOn(WareHouseDelegate.prototype, 'execute')
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
        it('should return deleteWareHouseo', (done) => {
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
                .spyOn(WareHouseDelegate.prototype, 'execute')
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
        it('Must return a WareHouse', (done) => {

            // Arrange
            const _id = '642fae07d90efd0793fa7609';

            const mockData = {
                name: "Vice City",
                address: "Miami, USA",
                phone: "3050009660028",
                _id: "642fae07d90efd0793fa7609"
            };
            const expectedData = {
                name: "Vice City",
                address: "Miami, USA",
                phone: "3050009660028",
                _id: "642fae07d90efd0793fa7609"
            };
            const expectedInstanceType = Observable<WareHouseEntityInfra>;

            const stubFindById = jest.fn(
                () =>
                    new Observable<WareHouseEntityInfra>((subscriber) => {
                        subscriber.next({ _id, ...mockData } as WareHouseEntityInfra);
                        subscriber.complete();
                    }),
            );
            jest
                .spyOn(WareHouseDelegate.prototype, 'execute').mockReturnValue(stubFindById());

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
