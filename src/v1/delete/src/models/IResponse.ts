import { IErrorResponse } from './IErrorResponse';

export interface IResponse {
  errors?: IErrorResponse;
  data?: boolean;
}
