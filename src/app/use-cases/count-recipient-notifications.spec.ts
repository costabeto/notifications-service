import { makeNotification } from '../../../test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipients notification', () => {
  it('should be able to count notifications of a recipient', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { count: recipient1NotificationsCount } =
      await countRecipientNotifications.execute({
        recipientId: 'recipient-1',
      });

    const { count: recipient2NotificationsCount } =
      await countRecipientNotifications.execute({
        recipientId: 'recipient-2',
      });

    expect(recipient1NotificationsCount).toEqual(2);

    expect(recipient2NotificationsCount).toEqual(1);
  });
});
