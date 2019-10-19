import { Guid } from 'guid-typescript';
import { IDynamoDBNotification } from '../models/IDynamoDBNotification';
import { IMessage, ISignupMessage } from '../models/IMessage';

export class NotificationService {
  public static createNotificationFromEvent(
    message: IMessage
  ): IDynamoDBNotification | null {
    switch (message.type) {
      case 'Signup':
        return NotificationService.createFromSignupEvent(
          message as ISignupMessage
        );
      default:
        return null;
    }
  }

  private static createFromSignupEvent(
    message: ISignupMessage
  ): IDynamoDBNotification | null {
    const dateTime = new Date();
    const expiryTime = new Date();
    expiryTime.setDate(expiryTime.getDate() + 3);
    const expiryTimeEpoch = Math.floor(expiryTime.getTime() / 1000);

    if (message.firstName && message.lastName && message.userId) {
      return {
        UserId: {
          S: message.userId,
        },
        Id: {
          S: Guid.create().toString(),
        },
        Title: {
          S: `Welcome ${message.firstName} ${message.lastName}`,
        },
        Body: {
          S: `Welcome ${message.firstName} ${message.lastName}`,
        },
        CreatedDate: {
          S: dateTime.toISOString(),
        },
        ExpirationTime: {
          N: `${expiryTimeEpoch}`,
        },
      };
    } else {
      return null;
    }
  }
}
