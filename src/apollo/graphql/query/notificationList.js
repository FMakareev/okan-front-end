import { notificationItem } from './notificationItem';
import range from '../../helpers/range';

export const notificationList = max => range(max).map(d => notificationItem());
