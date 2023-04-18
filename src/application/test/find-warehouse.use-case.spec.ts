import { Observable } from "rxjs";
import { WareHouseDomain } from "src/domain/models/warehouse.model";
import { FindWareHouseUseCase } from "../use-case/warehouse/find-warehouse.use-case";
import { IWareHouseRepository } from "src/domain/i-repository/i-warehouse.repositoty";

describe('FindWareHouseUseCase', () => {
  let casoUso: FindWareHouseUseCase;
  let repositorio: IWareHouseRepository;

  beforeEach(() => {
    repositorio = {
      findAll: jest.fn(),
    } as any as IWareHouseRepository;
    casoUso = new FindWareHouseUseCase(repositorio);
  });

  it('Debe ser definido', () => {
    expect(casoUso).toBeDefined();
  });

  it('Debe llamar a repositorio.findAll', (done) => {

    // Arrange
    const mockData: WareHouseDomain[] = [
        {
            name: "Vice City",
            address: "Miami, USA",
            phone: "3050009660028"
        },
        {
            name: "Los Santos",
            address: "California, USA",
            phone: "3050067946548"
        }
    ];
    const expectedData = mockData;
    const expectedInstanceType = Observable;
    const stubFindAll = jest.fn(
      () =>
        new Observable<WareHouseDomain[]>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );

    jest.spyOn(repositorio, 'findAll').mockReturnValue(stubFindAll());

    // Act
    const result = casoUso.execute();

    // Assert
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
    expect(repositorio.findAll).toHaveBeenCalled();
  });
});
