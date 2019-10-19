import { IDynamoDBNotification } from './IDynamoDBNotification';

export interface IDynamodbResponse {
  Items: IDynamoDBNotification[];
  Count: number;
}
