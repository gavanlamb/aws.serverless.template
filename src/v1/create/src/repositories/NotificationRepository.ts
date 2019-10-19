import { DynamoDB } from 'aws-sdk';
import { IDynamoDBNotification } from '../models/IDynamoDBNotification';
import { Logger } from '../utils/Logger';

export class NotificationRepository {
  private readonly dynamoDB: DynamoDB;

  constructor() {
    this.dynamoDB = new DynamoDB({
      apiVersion: '2012-08-10',
      region: 'ap-southeast-2',
    });
  }

  public async put(notification: IDynamoDBNotification): Promise<void> {
    try {
      const params = {
        Item: notification,
        TableName: process.env.TableName as string,
      };

      await this.dynamoDB.putItem(params).promise();
    } catch (error) {
      Logger.logger.log(
        'error',
        'Error encountered while saving item to dynamo db',
        {
          error,
        }
      );
    }
  }
}
