import { makeNotification } from '../../../test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('List recipient notification', () => {
  it('should be able to list notifications of a recipient', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications: recipient1Notifications } =
      await getRecipientNotifications.execute({
        recipientId: 'recipient-1',
      });

    const { notifications: recipient2Notifications } =
      await getRecipientNotifications.execute({
        recipientId: 'recipient-2',
      });

    expect(recipient1Notifications.length).toEqual(2);
    expect(recipient1Notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );

    expect(recipient2Notifications.length).toEqual(1);
    expect(recipient2Notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-2' }),
      ]),
    );
  });
});
