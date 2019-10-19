import { IErrorResponse } from './IErrorResponse';
import { INotification } from './INotification';

export interface IResponse {
  errors?: IErrorResponse[];
  data?: INotification;
}
