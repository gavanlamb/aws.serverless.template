import * as AWS from 'aws-sdk';
import * as AWSMock from 'aws-sdk-mock';
import {PutItemInput} from 'aws-sdk/clients/dynamodb';
import {IDynamoDBNotification} from '../../src/models/IDynamoDBNotification';
import {NotificationRepository} from '../../src/repositories/NotificationRepository';

describe('Notification Repository tests', () => {
    process.env.TableName = 'test-table';

    it('Successfully Saved Notification', async () => {
        const notification:IDynamoDBNotification = {
            UserId: {
                S: 'userId',
            },
            Id: {
                S: 'GUID',
            },
            Title: {
                S: 'Welcome',
            },
            Body: {
                S: 'Welcome',
            },
            CreatedDate: {
                S: 'CreatedDate',
            },
            ExpirationTime: {
                N: '9999999999999',
            }
        };

        const input = {
            Item: notification,
            TableName: process.env.TableName as string,
        };

        AWSMock.setSDKInstance(AWS);
        // tslint:disable-next-line:ban-types
        AWSMock.mock('DynamoDB', 'putItem',(params: PutItemInput, callback: Function) => {
            console.log('DynamoDB', 'putItem', 'mock called', params);
            callback(null, input);
        });

        const repository = new NotificationRepository();
        await repository.put(notification);

        const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
        expect(await dynamodb.putItem(input).promise()).toStrictEqual(input);

        AWSMock.restore('DynamoDB');
    });
});