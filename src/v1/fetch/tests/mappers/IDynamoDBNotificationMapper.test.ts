import {IDynamoDBNotificationMapper} from '../../src/mappers/IDynamoDBNotificationMapper';
import {IDynamoDBNotification} from "../../src/models/IDynamoDBNotification";

describe('Mapper tests', () => {
    process.env.TableName = 'test-table';

    it('Successfully map DynamoDB item to Notification', async () => {
        const item:IDynamoDBNotification = {
            Title: {
                S: 'Title',
            },
            Id: {
                S: 'Id',
            },
            Body:{
                S: 'Body'
            }
        };

        const mappedItem = IDynamoDBNotificationMapper.map(item);

        expect(mappedItem?.id).toBe('Id');
        expect(mappedItem?.title).toBe('Title');
    });
    it('Unsuccessfully map DynamoDB item to Notification when id is falsey', async () => {
        const item:IDynamoDBNotification = {
            Title: {
                S: 'Title',
            },
            Id: {
                S: '',
            },
            Body:{
                S: 'Body'
            }
        };

        const mappedItem = IDynamoDBNotificationMapper.map(item);

        expect(mappedItem).toBeNull();
    });
});