
import { Model } from "mongoose";
import { WareHouseMongoRepository } from "../../databases/mongo/repositories/WareHouse.repository";
import { WareHouseMongo } from "../../databases/mongo/schema/WareHouse.schema";
import { WareHouseService } from "../WareHouse.service";
import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { lastValueFrom, of, throwError } from "rxjs";
import { InternalServerErrorException } from "@nestjs/common";


describe('WareHouseService', () => {
    let wareHouseMongoRepository: WareHouseMongoRepository;
    let wareHouseMongoModel: Model<WareHouseMongo>;
    let wareHouseService: WareHouseService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WareHouseMongoRepository,
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
                WareHouseService,
            ],
        }).compile();
        wareHouseService = module.get<WareHouseService>(WareHouseService);
        wareHouseMongoRepository = module.get<WareHouseMongoRepository>(WareHouseMongoRepository);
        wareHouseMongoModel = module.get<Model<WareHouseMongo>>(getModelToken(WareHouseMongo.name));
    });

    it('should be defined', () => {
        expect(WareHouseMongoRepository).toBeDefined();
    });



    describe('findAll', () => {
        it('should return an array of WareHouseMongos', async () => {

            const mockWareHouseMongos = [
                {
                    name: "Vice City",
                    address: "Miami, USA",
                    phone: "3050009660028"
                },

                {
                    name: "Los Santos",
                    address: "California, USA",
                    phone: "305598764565465"
                }
            ];


            jest.spyOn(wareHouseMongoModel, 'find').mockResolvedValue(mockWareHouseMongos as any);

            const result = wareHouseMongoRepository.findAll();

            expect(await lastValueFrom(result)).toEqual(mockWareHouseMongos);
        });
    });


    describe('create', () => {
        it('Debe devolver un nuevo WareHouseMongo', async () => {

            // Arrange
            const WareHouseMongo =
            {
                name: "Vice City",
                address: "Miami, USA",
                phone: "3050009660028"
            };

            const mockWareHouseMongo = {
                name: "Vice City",
                address: "Miami, USA",
                phone: "3050009660028",
                _id: "642fae07d90efd0793fa7609"
            };

            const expectedWareHouseMongo = {
                name: "Vice City",
                address: "Miami, USA",
                phone: "3050009660028",
                _id: "642fae07d90efd0793fa7609"
            };


            jest.spyOn(wareHouseMongoModel, 'create').mockResolvedValue(mockWareHouseMongo as any);

            // Act
            const result = wareHouseMongoRepository.create(WareHouseMongo);

            // Assert
            expect(await lastValueFrom(result)).toEqual(expectedWareHouseMongo);
        });
    });



    describe('update', () => {
        it('Debe devolver un WareHouseMongo actualizado', async () => {

            // Arrange
            const _id = '642fae07d90efd0793fa7609';

            const WareHouseMongo = {
                name: "Vice City",
                address: "Miami, USA",
                phone: "3050009660028"
            };

            const mockWareHouseMongo = {
                name: "Vice City",
                address: "Miami, USA",
                phone: "3050009660028",
                _id: "642fae07d90efd0793fa7609"
            };

            const expectedWareHouseMongo = {
                name: "Vice City",
                address: "Miami, USA",
                phone: "3050009660028",
                _id: "642fae07d90efd0793fa7609"
            };

            jest
                .spyOn(wareHouseMongoModel, 'findByIdAndUpdate').mockResolvedValue(mockWareHouseMongo as any);

            // Act
            const result = wareHouseMongoRepository.update(_id, WareHouseMongo);

            // Assert
            expect(await lastValueFrom(result)).toEqual(expectedWareHouseMongo);
        });

        it('Debe lanzar un InternalServerErrorException', (done) => {
            // Arrange
            const _id = '642fae07d90efd0793fa7609';

            const WareHouseMongo = {
                name: "Vice City",
                address: "Miami, USA",
                phone: "3050009660028",
            };

            const errorMessage = 'Something went wrong';

            const mockError = jest.fn().mockReturnValueOnce(throwError(new InternalServerErrorException(errorMessage)));

            wareHouseMongoRepository.update = mockError;

            // Act
            const result = wareHouseMongoRepository.update(_id, WareHouseMongo);

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
            const _id = '642fae07d90efd0793fa7609';

            const expectedResponse = true;


            jest
                .spyOn(wareHouseMongoModel, 'findByIdAndDelete')
                .mockResolvedValue({} as any);

            // Act
            const result = wareHouseMongoRepository.delete(_id);

            // Assert
            expect(await lastValueFrom(result)).toEqual(expectedResponse);
        });

        it('Debe lanzar un InternalServerErrorException', (done) => {
            // Arrange
            const _id = '642eff6e20b57580dfc38a7f';

            const errorMessage = 'Something went wrong';

            const mockError = jest.fn().mockReturnValueOnce(throwError(new InternalServerErrorException(errorMessage)));

            wareHouseMongoRepository.delete = mockError;

            // Act
            const result = wareHouseMongoRepository.delete(_id);

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
        it('Debe devolver un WareHouseMongo actualizado', async () => {

            // Arrange
            const _id = '642fae07d90efd0793fa7609';

            const mockWareHouseMongo = {
                name: "Vice City",
                address: "Miami, USA",
                phone: "3050009660028",
                _id: "642fae07d90efd0793fa7609"
            };

            const expectedWareHouseMongo = {
                name: "Vice City",
                address: "Miami, USA",
                phone: "3050009660028",
                _id: "642fae07d90efd0793fa7609"
            };

            jest
                .spyOn(wareHouseMongoModel, 'findById').mockResolvedValue(mockWareHouseMongo as any);

            // Act
            const result = wareHouseMongoRepository.findById(_id);

            // Assert
            expect(await lastValueFrom(result)).toEqual(expectedWareHouseMongo);
        });

    });


})

