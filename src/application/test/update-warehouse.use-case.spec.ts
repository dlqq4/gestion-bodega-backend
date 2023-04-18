import { of } from 'rxjs';
import { UpdateWareHouseUseCase } from '../use-case/warehouse/update-warehouse.use-case';
import { IWareHouseRepository } from 'src/domain/i-repository/i-warehouse.repositoty';
import { WareHouseDomain } from 'src/domain/models/warehouse.model';

describe('UpdateWareHouseUseCase', () => {
  let useCase: UpdateWareHouseUseCase;
  let repository: IWareHouseRepository;

  beforeEach(() => {
    repository = {
      update: jest.fn(),
    } as any as IWareHouseRepository;
    useCase = new UpdateWareHouseUseCase(repository);
  });

  it('should update warehouse', (done) => {
    // Arrange
    const id = 'warehouse-id';
    const warehouse: WareHouseDomain = {
      name: "Los Santos",
      address: "California, USA",
      phone: "0947890223263"
    };
    const expectedWarehouse: WareHouseDomain = {
      name: "Los Santos",
      address: "California, USA",
      phone: "0947890223263"
    };
    jest.spyOn(repository, 'update').mockReturnValue(of(expectedWarehouse));

    // Act
    const result = useCase.execute(id, warehouse);

    // Assert
    result.subscribe((updatedWarehouse) => {
      expect(repository.update).toHaveBeenCalledWith(id, warehouse);
      expect(updatedWarehouse).toEqual(expectedWarehouse);
      done();
    });
  });
});
