import { NotificationRepository } from './repositories/NotificationRepository';
import { NotificationService } from './services/NotificationService';

export const handler: any = async (event: { Records: any[] }) => {
  const notificationPromises = [];

  for (const record of event.Records) {
    const body = JSON.parse(record.body);
    const notificationRepository = new NotificationRepository();
    const notification = NotificationService.createNotificationFromEvent(body);
    if (notification) {
      notificationPromises.push(notificationRepository.put(notification));
    }
  }

  if (notificationPromises.length > 0) {
    await Promise.all(notificationPromises);
  }

  return {};
};
