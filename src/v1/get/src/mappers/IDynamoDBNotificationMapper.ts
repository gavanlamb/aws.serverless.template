import {IDynamoDBNotification} from "../models/IDynamoDBNotification";
import { INotification } from '../models/INotification';

export class IDynamoDBNotificationMapper {
  public static map(dynamoDBRecord: IDynamoDBNotification): INotification | null {
    if (
      dynamoDBRecord.Id.S &&
      dynamoDBRecord.Title.S &&
      dynamoDBRecord.Body.S &&
      dynamoDBRecord.CreatedDate.S
    ) {
      return {
        id: dynamoDBRecord.Id.S,
        title: dynamoDBRecord.Title.S,
        body: dynamoDBRecord.Body.S,
        createdDate: dynamoDBRecord.CreatedDate.S,
      };
    }

    return null;
  }
}
