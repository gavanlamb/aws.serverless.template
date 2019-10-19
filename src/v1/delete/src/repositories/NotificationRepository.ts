import { DynamoDB } from 'aws-sdk';
import { Logger } from '../utils/Logger';

export class NotificationRepository {
  private readonly dynamoDB: DynamoDB;

  constructor() {
    this.dynamoDB = new DynamoDB({
      apiVersion: '2012-08-10',
    });
  }

  public async delete(
    notificationId: string,
    userId: string
  ): Promise<boolean> {
    // @ts-ignore
    await this.dynamoDB
      .deleteItem({
        // @ts-ignore
        TableName: process.env.TableName,
        Key: {
          UserId: {
            S: userId,
          },
          Id: {
            S: notificationId,
          },
        },
      })
      .promise();

    Logger.logger.log('debug', 'Successfully deleted notification', {
      notificationId,
      userId,
    });

    return true;
  }
}
