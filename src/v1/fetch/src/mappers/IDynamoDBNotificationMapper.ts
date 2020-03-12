import { IDynamoDBNotification } from "../models/IDynamoDBNotification";
import { INotification } from '../models/INotification';

export class IDynamoDBNotificationMapper {
  public static map(dynamodbRecord: IDynamoDBNotification): INotification | null {
    if (dynamodbRecord.Id.S && dynamodbRecord.Title.S && dynamodbRecord.Body.S) {
      return {
        id: dynamodbRecord.Id.S,
        title: dynamodbRecord.Title.S,
        body: dynamodbRecord.Body.S
      };
    }
    return null;
  }
}
