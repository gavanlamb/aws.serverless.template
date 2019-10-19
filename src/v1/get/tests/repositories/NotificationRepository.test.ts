import * as AWS from 'aws-sdk';
import * as AWSMock from 'aws-sdk-mock';
import {GetItemInput} from 'aws-sdk/clients/dynamodb';
import {NotificationRepository} from '../../src/repositories/NotificationRepository';

describe('Notification Repository tests', () => {
    process.env.TableName = 'test-table';
    it('Successfully Get Notification', async () => {
        const notification ={
            Item:{
                Title: {
                    S: 'Title',
                },
                Id: {
                    S: 'Id',
                },
                Body:{
                    S: 'Body'
                },
                CreatedDate:{
                    S: 'date'
                }
            }
        };

        AWSMock.setSDKInstance(AWS);
        // tslint:disable-next-line:ban-types
        AWSMock.mock('DynamoDB', 'getItem',(params: GetItemInput, callback: Function) => {
            console.log('DynamoDB', 'getItem', 'mock called', params);
            callback(null, notification);
        });

        const repository = new NotificationRepository();
        const result = await repository.get('notificationId','userId');
        expect(result?.id).toBe('Id');
        expect(result?.title).toBe('Title');
        expect(result?.body).toBe('Body');
        expect(result?.createdDate).toBe('date');
        AWSMock.restore('DynamoDB');
    });
    it('Unsuccessfully Get Notification', async () => {
        const notification = {};

        AWSMock.setSDKInstance(AWS);
        // tslint:disable-next-line:ban-types
        AWSMock.mock('DynamoDB', 'getItem',(params: GetItemInput, callback: Function) => {
            console.log('DynamoDB', 'getItem', 'mock called', params);
            callback(null, notification);
        });

        const repository = new NotificationRepository();
        const result = await repository.get('notificationId','userId');
        expect(result).toBeNull();
        AWSMock.restore('DynamoDB');
    });
});