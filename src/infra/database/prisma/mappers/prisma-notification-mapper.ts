import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { Notification as RawNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        canceledAt: raw.canceledAt,
        category: raw.category,
        content: new Content(raw.content),
        createdAt: raw.createdAt,
        readAt: raw.readAt,
        recipientId: raw.recipientId,
      },
      raw.id,
    );
  }
}
