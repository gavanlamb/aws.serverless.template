import {AttributeMap, AttributeValue} from "aws-sdk/clients/dynamodb";

export interface IDynamoDBNotification extends AttributeMap {
  Id: AttributeValue;
  Title: AttributeValue;
}
