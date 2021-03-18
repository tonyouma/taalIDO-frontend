import faker from 'faker';
import mock from 'src/utils/mock';
import { orderBy } from 'lodash';
import { set, sub } from 'date-fns';
import { getImgAvatar } from 'src/utils/getImages';

// ----------------------------------------------------------------------

let notifications = [
  {
    id: faker.random.uuid(),
    title: 'Your order is placed',
    description: 'waiting for shipping',
    avatar: null,
    type: 'order_placed',
    createdAt: set(new Date(), { hours: 10, minutes: 30 }),
    isUnRead: true
  },
  {
    id: faker.random.uuid(),
    title: faker.name.findName(),
    description: 'answered to your comment on the Minimal',
    avatar: getImgAvatar(2),
    type: 'friend_interactive',
    createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
    isUnRead: true
  },
  {
    id: faker.random.uuid(),
    title: 'You have new message',
    description: '5 unread messages',
    avatar: null,
    type: 'chat_message',
    createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
    isUnRead: false
  },
  {
    id: faker.random.uuid(),
    title: 'You have new mail',
    description: 'sent from Guido Padberg',
    avatar: null,
    type: 'mail',
    createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
    isUnRead: false
  },
  {
    id: faker.random.uuid(),
    title: 'Delivery processing',
    description: 'Your order is being shipped',
    avatar: null,
    type: 'order_shipped',
    createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
    isUnRead: false
  }
];

// ----------------------------------------------------------------------

mock.onGet('/api/notifications').reply(() => {
  notifications = orderBy(notifications, ['createdAt'], ['desc']);

  return [200, { notifications }];
});

// ----------------------------------------------------------------------
