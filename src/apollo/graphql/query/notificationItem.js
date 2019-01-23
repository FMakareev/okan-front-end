import faker from 'faker';
import { getRandomNotification } from '../../helpers/getRandomNotification';
import { getRandomMongoID } from '../../helpers/getRandomMongoid';

export const notificationItem = () => ({
  // mongoid
  id: getRandomMongoID(),
  // комментарий, содержит объект комментарий к ячейке
  comment: getRandomNotification(),
  // сообщение уведомления
  message: getRandomNotification(),
  // отправитель
  sender: User,
  // получатель
  recipient: User,
  // дата создания в ISO
  createat: String,
});
