import { Observable } from "rxjs";
import { CreateWareHouseUseCase } from "../use-case/warehouse/create-warehouse.use-case";
import { IWareHouseRepository } from "src/domain/i-repository/i-WareHouse.repositoty";
import { WareHouseDomain } from "src/domain/models/warehouse.model";



describe('CreateWareHouseUseCase', () => {
  let useCase: CreateWareHouseUseCase;
  let repositorio: IWareHouseRepository<WareHouseDomain>;


  beforeEach(() => {
    repositorio = {
      create: jest.fn(),
    } as any as IWareHouseRepository<WareHouseDomain>;
    useCase = new CreateWareHouseUseCase(repositorio);
  });

  it('Debe ser definido', () => {
    expect(useCase).toBeDefined();
  });

  it('should call repositorio.create', (done) => {

    // Arrange

    const wareHouse = {
      name: "Vice City",
      address: "Miami, USA",
      phone: "3050009660028"
  };

    const mockData = {
      name: "Vice City",
      address: "Miami, USA",
      phone: "3050009660028"
  };
    
    const expectedData = {
      name: "Vice City",
      address: "Miami, USA",
      phone: "3050009660028"
  };


    const expectedInstanceType = Observable<WareHouseDomain>;
    const stubCreate = jest.fn(
      () =>
        new Observable<WareHouseDomain>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    jest
      .spyOn(repositorio, 'create').mockReturnValue(stubCreate());


    // Act
    const result = useCase.execute(wareHouse);

    // Assert
    expect(repositorio.create).toHaveBeenCalledWith(mockData);
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });
});
