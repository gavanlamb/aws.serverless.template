import {
  AttributeValue,
  PutItemInputAttributeMap,
} from 'aws-sdk/clients/dynamodb';

export interface IDynamoDBNotification extends PutItemInputAttributeMap {
  UserId: AttributeValue;
  Id: AttributeValue;
  Title: AttributeValue;
  Body: AttributeValue;
  CreatedDate: AttributeValue;
  ExpirationTime: AttributeValue;
}
