import { APIGatewayProxyHandler } from 'aws-lambda';
import { Guid } from 'guid-typescript';
import { IResponse } from './models/IResponse';
import { NotificationRepository } from './repositories/NotificationRepository';
import { Logger } from './utils/Logger';

export const handler: APIGatewayProxyHandler = async event => {
  const userId = event?.requestContext?.authorizer?.claims?.sub;
  let body: IResponse;
  const notificationId = event.pathParameters?.notificationId;
  if (!notificationId) {
    body = {
      errors: {
        id: Guid.create().toString(),
        status: '400',
        code: 'notv1-dt-nid',
        title: 'Invalid Notification Id',
        detail: 'Notification Id is not set',
        source: {
          parameter: 'notificationId',
        },
      },
    };

    Logger.logger.log('error', 'Invalid Notification Id', {
      body,
      notificationId,
      userId,
    });

    return {
      body: JSON.stringify(body),
      statusCode: 400,
    };
  }

  const notificationRepository = new NotificationRepository();
  const response = await notificationRepository.delete(notificationId, userId);
  if (!response) {
    body = {
      errors: {
        id: Guid.create().toString(),
        status: '404',
        code: 'notv1-dt-not-del-err',
        title: 'Notification not found',
        detail: `Notification not found:${notificationId}`,
      },
    };

    Logger.logger.log('error', 'Failed to deleted notification', {
      body,
      notificationId,
      userId,
    });

    return {
      body: JSON.stringify(body),
      statusCode: 404,
    };
  }

  body = {
    data: true,
  };
  return {
    body: JSON.stringify(body),
    statusCode: 200,
  };
};
