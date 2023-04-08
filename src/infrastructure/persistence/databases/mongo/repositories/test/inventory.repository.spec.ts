import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { async, of, lastValueFrom, throwError, from } from 'rxjs';
import { InternalServerErrorException } from '@nestjs/common';
import { InventoryMongoRepository } from '../inventory.repository';
import { InventoryMongo } from '../../schema/inventory.schema';




describe('InventoryMongoRepository', () => {
  let inventoryMongoRepository: InventoryMongoRepository;
  let inventoryMongoModel: Model<InventoryMongo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryMongoRepository,
        {
          provide: getModelToken(InventoryMongo.name),
          useValue: {
            findById: jest.fn(),
            create: jest.fn(),
            findByIdAndDelete: jest.fn(),
            //find: jest.fn(),
            find: jest.fn().mockReturnThis(),
            populate: jest.fn().mockReturnThis(),
            findByIdAndUpdate: jest.fn(),
          },
        },
      ],
    }).compile();
    inventoryMongoRepository = module.get<InventoryMongoRepository>(InventoryMongoRepository);
    inventoryMongoModel = module.get<Model<InventoryMongo>>(getModelToken(InventoryMongo.name));
  });

  it('should be defined', () => {
    expect(InventoryMongoRepository).toBeDefined();
  });



  describe('findAll', () => {
    it('Debe devolver un arreglo de InventoryMongos', (done) => {

      // Arrange

      const mockInventoryMongos = [

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

      ]
      const expectedInventoryMongos = [

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

      ]
      

      //jest.spyOn(inventoryMongoModel, 'find').mockReturnValue(mockInventoryMongos as any);
      jest.spyOn(inventoryMongoModel, 'find').mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(mockInventoryMongos),
        }),
      } as any);

      // Act
      const result = inventoryMongoRepository.findAll();

      // Assert
      const resultStream = new Array<InventoryMongo>();
      
      result.subscribe({
        next: InventoryMongos => {
          expect(InventoryMongos).toEqual(expectedInventoryMongos);
        },
        complete: () => {
          done();
        },
      });
    });
  });


  describe('create', () => {
    it('Debe devolver un nuevo InventoryMongo', async () => {

      // Arrange
      const InventoryMongo =
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
      };

      const mockInventoryMongo = {
        product: "642f658515ea2d5196948be6",
        warehouse: "642f4085235dc7d9d0120519",
        level: "HIGH",
        quantity: 200,
        _id: "642fa2f610712d642de460b3"
      };

      const expectedInventoryMongo = {
        product: "642f658515ea2d5196948be6",
        warehouse: "642f4085235dc7d9d0120519",
        level: "HIGH",
        quantity: 200,
        _id: "642fa2f610712d642de460b3"
      };


      jest.spyOn(inventoryMongoModel, 'create').mockResolvedValue(mockInventoryMongo as any);

      // Act
      const result = inventoryMongoRepository.create(InventoryMongo);

      // Assert
      expect(await lastValueFrom(result)).toEqual(expectedInventoryMongo);
    });
  });



  describe('update', () => {
    it('Debe devolver un InventoryMongo actualizado', async () => {

      // Arrange
      const _id = '642fa2f610712d642de460b3';

      const InventoryMongo = {
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

      const mockInventoryMongo = {
        product: "642f658515ea2d5196948be6",
        warehouse: "642f4085235dc7d9d0120519",
        level: "LOW",
        quantity: 1,
        _id: "642fa2f610712d642de460b3"
      };

      const expectedInventoryMongo = {
        product: "642f658515ea2d5196948be6",
        warehouse: "642f4085235dc7d9d0120519",
        level: "LOW",
        quantity: 1,
        _id: "642fa2f610712d642de460b3"
      }

      jest
        .spyOn(inventoryMongoModel, 'findByIdAndUpdate').mockResolvedValue(mockInventoryMongo as any);

      // Act
      const result = inventoryMongoRepository.update(_id, InventoryMongo);

      // Assert
      expect(await lastValueFrom(result)).toEqual(expectedInventoryMongo);
    });

    it('Debe lanzar un InternalServerErrorException', (done) => {
      // Arrange
      const _id = '642fae07d90efd0793fa7609';

      const InventoryMongo = {
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

      const errorMessage = 'Something went wrong';

      const mockError = jest.fn().mockReturnValueOnce(throwError(new InternalServerErrorException(errorMessage)));

      inventoryMongoRepository.update = mockError;

      // Act
      const result = inventoryMongoRepository.update(_id, InventoryMongo);

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
      const _id = '642fa2f610712d642de460b3';

      const expectedResponse = true;


      jest
        .spyOn(inventoryMongoModel, 'findByIdAndDelete')
        .mockResolvedValue({} as any);

      // Act
      const result = inventoryMongoRepository.delete(_id);

      // Assert
      expect(await lastValueFrom(result)).toEqual(expectedResponse);
    });

    it('Debe lanzar un InternalServerErrorException', (done) => {
      // Arrange
      const _id = '642eff6e20b57580dfc38a7f';

      const errorMessage = 'Something went wrong';

      const mockError = jest.fn().mockReturnValueOnce(throwError(new InternalServerErrorException(errorMessage)));

      inventoryMongoRepository.delete = mockError;

      // Act
      const result = inventoryMongoRepository.delete(_id);

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
    it('Debe devolver un InventoryMongo actualizado', async () => {

      // Arrange
      const _id = '642fa2f610712d642de460b3';

      const mockInventoryMongo = {
        _id: "642fa2f610712d642de460b3",
        product: "642f658515ea2d5196948be6",
        warehouse: "642f4085235dc7d9d0120519",
        level: "low",
        quantity: 1
      };

      const expectedInventoryMongo = {
        _id: "642fa2f610712d642de460b3",
        product: "642f658515ea2d5196948be6",
        warehouse: "642f4085235dc7d9d0120519",
        level: "low",
        quantity: 1
      };

      jest
        .spyOn(inventoryMongoModel, 'findById').mockResolvedValue(mockInventoryMongo as any);

      // Act
      const result = inventoryMongoRepository.findById(_id);

      // Assert
      expect(await lastValueFrom(result)).toEqual(expectedInventoryMongo);
    });

  });


})
