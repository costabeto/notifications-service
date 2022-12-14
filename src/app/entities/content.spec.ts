import { Content } from './content';

describe('Notification content', () => {
  it('it should be able to create a notification content', () => {
    const content = new Content('Você tem uma nova solicitação de amizade');

    expect(content).toBeTruthy();
  });

  it('it should not be able to create a notification content with less than 5 caracters', () => {
    expect(() => new Content('123')).toThrow();
  });

  it('it should not be able to create a notification content with more than 240 caracters', () => {
    expect(() => new Content('1'.repeat(241))).toThrow();
  });
});
