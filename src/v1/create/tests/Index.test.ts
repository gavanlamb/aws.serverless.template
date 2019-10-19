import { handler } from '../src/Index';
import { IDynamoDBNotification } from '../src/models/IDynamoDBNotification';
import { NotificationRepository } from '../src/repositories/NotificationRepository';
import { NotificationService } from '../src/services/NotificationService';

describe('Create Notifications Handler tests', () => {

    it('Successfully create Notification', async () => {
        const body = {
            type: 'Signup',
            userId: 'userId',
            firstName: 'firstName',
            lastName: 'lastName'
        };
        const event = {
            Records: [
                {
                    body: JSON.stringify(body)
                }
            ]
        };

        NotificationRepository.prototype.put = jest.fn().mockImplementationOnce(
            (notification:IDynamoDBNotification) => {
                    console.log(notification);
                });

        const mockCreate = jest.fn();
        mockCreate.mockReturnValue({
            UserId: {
                S: 'userId',
            },
            Id: {
                S: 'id',
            },
            Title: {
                S: 'Welcome Joe Biggs',
            },
            Body: {
                S: 'Welcome Joe Biggs',
            },
            CreatedDate: {
                S: '2020-02-14T06:35:16Z',
            },
            ExpirationTime: {
                N: '1582617021',
            },
        });
        NotificationService.createNotificationFromEvent = mockCreate.bind(NotificationService);

        const value = await handler(event);
        expect(mockCreate).toBeCalledWith(body);
        expect(value).toStrictEqual({});
    });
});