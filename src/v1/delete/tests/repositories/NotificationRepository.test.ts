import * as AWS from 'aws-sdk';
import * as AWSMock from 'aws-sdk-mock';
import {DeleteItemInput} from 'aws-sdk/clients/dynamodb';
import {NotificationRepository} from '../../src/repositories/NotificationRepository';

describe('Notification Repository tests', () => {
    process.env.TableName = 'test-table';

    it('Successfully delete Notification', async () => {
        const input:DeleteItemInput = {
            Key: {
                UserId: {
                    S: 'userId',
                },
                Id: {
                    S: 'notificationId',
                },
            },
            TableName: process.env.TableName as string,
        };

        AWSMock.setSDKInstance(AWS);
        // tslint:disable-next-line:ban-types
        AWSMock.mock('DynamoDB', 'deleteItem',(params: DeleteItemInput, callback: Function) => {
            console.log('DynamoDB', 'deleteItem', 'mock called', params);
            callback(null, input);
        });

        const repository = new NotificationRepository();
        await repository.delete('userId', 'notificationId');

        const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
        expect(await dynamodb.deleteItem(input).promise()).toStrictEqual(input);

        AWSMock.restore('DynamoDB');
    });
});