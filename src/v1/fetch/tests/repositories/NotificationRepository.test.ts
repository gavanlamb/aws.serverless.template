import * as AWS from 'aws-sdk';
import * as AWSMock from 'aws-sdk-mock';
import {QueryInput} from 'aws-sdk/clients/dynamodb';
import {NotificationRepository} from '../../src/repositories/NotificationRepository';

describe('Notification Repository tests', () => {
    process.env.TableName = 'test-table';
    it('Successfully Query User\'s Notifications', async () => {
        const notifications = {
            Items:[
                {
                    Id: {
                        S: 'Id'
                    },
                    Title:  {
                        S: 'Title'
                    }
                },
                {
                    Id: {
                        S: 'Id1'
                    },
                    Title:  {
                        S: 'Title1'
                    }
                }
            ]
        };

        AWSMock.setSDKInstance(AWS);
        // tslint:disable-next-line:ban-types
        AWSMock.mock('DynamoDB', 'query',(params: QueryInput, callback: Function) => {
            console.log('DynamoDB', 'query', 'mock called', params);
            callback(null, notifications);
        });

        const repository = new NotificationRepository();
        const result = await repository.query('userId');
        expect(result?.length).toBe(2);
        AWSMock.restore('DynamoDB');
    });
    it('Unsuccessfully Query User\'s Notifications', async () => {
        const notifications = {};

        AWSMock.setSDKInstance(AWS);
        // tslint:disable-next-line:ban-types
        AWSMock.mock('DynamoDB', 'query',(params: QueryInput, callback: Function) => {
            console.log('DynamoDB', 'query', 'mock called', params);
            callback(null, notifications);
        });

        const repository = new NotificationRepository();
        const result = await repository.query('userId');
        expect(result).toBeNull();
        AWSMock.restore('DynamoDB');
    });
});