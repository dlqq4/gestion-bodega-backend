import { Test } from "@nestjs/testing";

import { ExecutionContext } from "@nestjs/common";
import { DeleteGuard } from "../delete-product.guard";

describe('DeleteGuard', () => {
  let guard: DeleteGuard;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [DeleteGuard],
    }).compile();
    guard = moduleRef.get<DeleteGuard>(DeleteGuard);
  });

  describe('canActivate', () => {
    it('should return true when the password is correct', () => {

      //arranger
      const req = {
        body: {
          contra: 'byeProduct',
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