import { IDynamoDBNotification } from "../models/IDynamoDBNotification";
import { INotification } from '../models/INotification';

export class IDynamoDBNotificationMapper {
  public static map(dynamodbRecord: IDynamoDBNotification): INotification | null {
    if (dynamodbRecord.Id.S && dynamodbRecord.Title.S) {
      return {
        id: dynamodbRecord.Id.S,
        title: dynamodbRecord.Title.S,
      };
    }
    return null;
  }
}
