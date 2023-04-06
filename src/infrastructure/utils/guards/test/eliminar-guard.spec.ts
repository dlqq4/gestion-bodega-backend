import { Test } from "@nestjs/testing";
import { EliminarGuard } from "../eliminar-producto.guard";
import { ExecutionContext } from "@nestjs/common";

describe('EliminarGuard', () => {
  let guard: EliminarGuard;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [EliminarGuard],
    }).compile();
    guard = moduleRef.get<EliminarGuard>(EliminarGuard);
  });

  describe('canActivate', () => {
    it('should return true when the password is correct', () => {

      //arranger
      const req = {
        body: {
          contra: 'chauProducto',
        },
      };

  //ACT
      const context = {
        switchToHttp: () => ({ getRequest: () => req }),
      } as ExecutionContext;

      //ASSERT
      expect(guard.canActivate(context)).toBe(true);


    });

    it('should return false when the password is incorrect', () => {
      const req = {
        body: {
          contra: 'cualquieritaLaPochola',
        },
      };
      const context = {
        switchToHttp: () => ({ getRequest: () => req }),
      } as ExecutionContext;
      expect(guard.canActivate(context)).toBe(false);
    });

    it('should return false when the password is not provided', () => {
      const req = {
        body: {},
      };
      const context = {
        switchToHttp: () => ({ getRequest: () => req }),
      } as ExecutionContext;
      expect(guard.canActivate(context)).toBe(false);
    });
  });
});