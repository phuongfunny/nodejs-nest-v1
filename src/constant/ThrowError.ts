import { HttpException, HttpStatus } from '@nestjs/common';

export const error = (status, message) => {
  switch (status) {
    case 400:
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    case 400:
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    default:
      break;
  }
};
