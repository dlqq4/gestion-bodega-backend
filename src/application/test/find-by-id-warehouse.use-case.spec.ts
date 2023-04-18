
import { FindByIdWareHouseUseCase } from "../use-case/warehouse/find-by-id-warehouse.use-case";
import { Observable } from "rxjs";
import { IWareHouseRepository } from "src/domain/i-repository/i-warehouse.repositoty";
import { WareHouseDomain } from "src/domain/models/warehouse.model";

describe('FindByIdWareHouseUseCase', () => {
  let casoUso: FindByIdWareHouseUseCase;
  let repositorio: IWareHouseRepository;
  const id = "123";

  beforeEach(() => {
    repositorio = {
      findById: jest.fn(),
    } as any as IWareHouseRepository;
    casoUso = new FindByIdWareHouseUseCase(repositorio);
  });

  it('Debe ser definido', () => {
    expect(casoUso).toBeDefined();
  });

  it('Debe llamar a repositorio.findById', (done) => {

    // Arrange
    const mockData: WareHouseDomain = {
      name: "Vice City",
      address: "Miami, USA",
      phone: "3050009660028"
  };
    const expectedData = mockData;
    const expectedInstanceType = Observable;
    const stubFindById = jest.fn(
      () =>
        new Observable<WareHouseDomain>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );

    jest.spyOn(repositorio, 'findById').mockReturnValue(stubFindById());

    // Act
    const result = casoUso.execute(id);

    // Assert
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
    expect(repositorio.findById).toHaveBeenCalledWith(id);
  });
});
