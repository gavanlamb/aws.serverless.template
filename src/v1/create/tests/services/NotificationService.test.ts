import {IMessage} from '../../src/models/IMessage';
import {NotificationService} from '../../src/services/NotificationService';

describe('Notification Service Tests', () => {
    it('Successfully create Notification for base message type', () => {
        const message = {
            type: 'Signup',
            userId: 'userid'
        };

        const notification = NotificationService.createNotificationFromEvent(message);

        expect(notification).toBeNull();
    });

    it('Successfully create Notification for sign-up message type', () => {
        const message = {
            type: 'Signup',
            userId: 'userid',
            firstName: 'Bobby',
            lastName: 'McGhee'
        };

        const notification = NotificationService.createNotificationFromEvent(message);

        expect(notification).toBeDefined();
        expect(notification?.UserId.S).toMatch(message.userId);
        expect(notification?.Title.S).toMatch(`Welcome ${message.firstName} ${message.lastName}`);
        expect(notification?.Body.S).toMatch(`Welcome ${message.firstName} ${message.lastName}`);
        expect(notification?.CreatedDate.S).toBeDefined();
        expect(notification?.ExpirationTime.N).toBeDefined();
    });

    it('Unsuccessfully create Notification for unknown message type', () => {
        const message:IMessage = {
            type: '',
            userId: 'userid'
        };

        const notification = NotificationService.createNotificationFromEvent(message);

        expect(notification).toStrictEqual(null);
    });
});