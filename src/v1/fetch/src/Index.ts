import { APIGatewayProxyHandler } from 'aws-lambda';
import { IResponse } from './models/IResponse';
import { NotificationRepository } from './repositories/NotificationRepository';

export const handler: APIGatewayProxyHandler = async event => {
  const userId = event.requestContext.authorizer?.claims.sub;
  let body: IResponse;

  const notificationRepository = new NotificationRepository();
  const response = await notificationRepository.query(userId);
  if (response?.length === 0) {
    body = {
      data: [],
    };
    return {
      body: JSON.stringify(body),
      statusCode: 204,
    };
  }
  body = {
    data: response ?? [],
  };
  return {
    body: JSON.stringify(body),
    statusCode: 200,
  };
};
