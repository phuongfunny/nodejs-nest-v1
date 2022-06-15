import { HttpStatus } from '@nestjs/common';

export const DataCreated = (dt: any) => {
  return {
    status: HttpStatus.CREATED,
    data: dt,
  };
};

export const GetSuccess = (dt: any) => {
  return {
    status: HttpStatus.OK,
    data: dt,
  };
};

export const TokenSuccess = (dt: any) => {
  return {
    status: HttpStatus.OK,
    token: dt,
  };
};
