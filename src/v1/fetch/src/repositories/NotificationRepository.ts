import { DynamoDB } from 'aws-sdk';
import { IDynamoDBNotificationMapper } from '../mappers/IDynamoDBNotificationMapper';
import { IDynamodbResponse } from "../models/IDynamodbResponse";
import { INotification } from '../models/INotification';
import { Logger } from '../utils/Logger';

export class NotificationRepository {
  private readonly dynamoDB: DynamoDB;

  constructor() {
    this.dynamoDB = new DynamoDB({
      apiVersion: '2012-08-10',
    });
  }

  public async query(userId: string): Promise<INotification[] | null> {
    if (process.env.TableName) {
      // @ts-ignore
      const response:IDynamodbResponse = await this.dynamoDB
        .query({
          TableName: process.env.TableName,
          IndexName: 'notification-created-date',
          KeyConditionExpression: 'UserId = :u',
          ScanIndexForward: false,
          ExpressionAttributeValues: {
            ':u': {
              S: userId,
            },
          },
          ProjectionExpression: 'Id, Title, Body',
        })
        .promise();

      if (response && response.Items) {
        Logger.logger.log('info', 'Items returned from db', {
          itemCount: response.Count,
          userId,
        });

        const notifications = [];

        for (const item of response.Items) {
          const notification = IDynamoDBNotificationMapper.map(item);
          if (notification) {
            notifications.push(notification);
          }
        }

        return notifications.length > 0 ? notifications : null;
      }

      Logger.logger.log('info', 'No items returned from', {
        response,
        userId,
      });
    }
    return null;
  }
}
