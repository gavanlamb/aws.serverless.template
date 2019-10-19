import { DynamoDB } from 'aws-sdk';
import { IDynamoDBNotificationMapper } from '../mappers/IDynamoDBNotificationMapper';
import { IDynamoDBNotification } from "../models/IDynamoDBNotification";
import { INotification } from '../models/INotification';

export class NotificationRepository {
  private readonly dynamoDB: DynamoDB;

  constructor() {
    this.dynamoDB = new DynamoDB({
      apiVersion: '2012-08-10',
    });
  }

  public async get(
    notificationId: string,
    userId: string
  ): Promise<INotification | null> {
    if (process.env.TableName) {
      const response = await this.dynamoDB
        .getItem({
          TableName: process.env.TableName,
          ConsistentRead: true,
          Key: {
            UserId: {
              S: userId,
            },
            Id: {
              S: notificationId,
            },
          },
          ProjectionExpression: 'Id, Title, Body, CreatedDate',
        })
        .promise();

      if (response && response.Item) {
        return IDynamoDBNotificationMapper.map(response.Item as IDynamoDBNotification);
      }
    }

    return null;
  }
}
