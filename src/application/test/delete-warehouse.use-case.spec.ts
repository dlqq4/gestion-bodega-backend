import { IWareHouseRepository } from "../../domain/i-repository/i-WareHouse.repositoty";
import { DeleteWareHouseUseCase } from "../use-case/warehouse/delete-warehouse.use-case";
import { Observable } from "rxjs";

describe('DeleteWareHouseUseCase', () => {
    let casoUso: DeleteWareHouseUseCase
;
    let repositorio: IWareHouseRepository
;
  
    beforeEach(() => {
      repositorio = {
        delete: jest.fn(),
      } as any as IWareHouseRepository
;
      casoUso = new DeleteWareHouseUseCase
(repositorio);
    });
  
    it('Debe ser definido', () => {
      expect(casoUso).toBeDefined();
    });
  
    it('Debe llamar a repositorio.eliminar', (done) => {
  
      // Arrange
  
      const _id = "6425dfdc4c36025fca1771f8"
  
      const mockData = true;
      const expectedData = true;
      const expectedInstanceType = Observable<boolean>;
      const stubCreate = jest.fn(
        () =>
          new Observable<boolean>((subscriber) => {
            subscriber.next(mockData);
            subscriber.complete();
          }),
      );
  
      jest.spyOn(repositorio, 'delete').mockReturnValue(stubCreate());
  
      // Act
      const result = casoUso.execute(_id);
  
      // Assert
      expect(result).toBeInstanceOf(expectedInstanceType);
      result.subscribe({
        next: (data) => {
          expect(data).toEqual(expectedData);
          done();
        },
      });
    });
  });
  